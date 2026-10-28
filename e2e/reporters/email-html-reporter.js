const fs = require("fs");
const path = require("path");

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(date) {
  if (!date) {
    return "N/A";
  }

  return new Date(date).toISOString().replace("T", " ").replace("Z", " UTC");
}

function formatDuration(milliseconds) {
  if (typeof milliseconds !== "number") {
    return "N/A";
  }

  return `${(milliseconds / 1000).toFixed(2)} seconds`;
}

function statusAppearance(status) {
  switch (status) {
    case "PASSED":
      return { color: "#28a745", icon: "✓" };
    case "SKIPPED":
      return { color: "#6c757d", icon: "-" };
    case "FLAKY":
      return { color: "#fd7e14", icon: "!" };
    case "RUNNING":
      return { color: "#0d6efd", icon: "…" };
    default:
      return { color: "#dc3545", icon: "✗" };
  }
}

function normalizePath(filePath) {
  if (!filePath) {
    return "N/A";
  }

  return path.relative(process.cwd(), filePath).split(path.sep).join("/");
}

class EmailHtmlReporter {
  constructor(options = {}) {
    this.outputFile =
      options.outputFile || path.join("test-results", "e2e-email-report.html");
    this.entries = new Map();
    this.globalErrors = [];
    this.startedAt = null;
    this.finishedAt = null;
    this.totalTests = 0;
    this.baseURL = options.baseURL || process.env.PLAYWRIGHT_BASE_URL || "N/A";
  }

  onBegin(config, suite) {
    this.startedAt = new Date();
    this.finishedAt = null;
    this.entries.clear();
    this.globalErrors = [];
    this.totalTests = suite.allTests().length;
    this.baseURL =
      config.projects?.[0]?.use?.baseURL ||
      config.webServer?.url ||
      this.baseURL ||
      "N/A";

    suite.allTests().forEach((testCase, index) => {
      this.entries.set(testCase.id, {
        id: testCase.id,
        order: index + 1,
        title: testCase.title,
        titlePath: testCase.titlePath().slice(1),
        file: normalizePath(testCase.location?.file),
        line: testCase.location?.line || null,
        status: "RUNNING",
        retry: 0,
        duration: null,
        finishedAt: null,
        errorMessage: "",
        errorStack: "",
        attachments: [],
      });
    });

    this.writeReport("RUNNING");
  }

  onTestEnd(testCase, result) {
    const outcome = testCase.outcome();
    const finalStatus =
      outcome === "expected"
        ? "PASSED"
        : outcome === "flaky"
          ? "FLAKY"
          : outcome === "skipped"
            ? "SKIPPED"
            : "FAILED";

    this.entries.set(testCase.id, {
      id: testCase.id,
      order: this.entries.get(testCase.id)?.order || this.entries.size + 1,
      title: testCase.title,
      titlePath: testCase.titlePath().slice(1),
      file: normalizePath(testCase.location?.file),
      line: testCase.location?.line || null,
      status: finalStatus,
      retry: result.retry,
      duration: result.duration,
      finishedAt: new Date(),
      errorMessage: result.error?.message || "",
      errorStack: result.error?.stack || "",
      attachments: (result.attachments || [])
        .filter((attachment) => attachment.path)
        .map((attachment) => ({
          name: attachment.name,
          path: normalizePath(attachment.path),
          contentType: attachment.contentType,
        })),
    });

    this.writeReport("RUNNING");
  }

  onError(error) {
    this.globalErrors.push(error?.message || String(error));
    this.writeReport("RUNNING");
  }

  async onEnd(result) {
    this.finishedAt = new Date();
    const finalStatus = result.status === "passed" ? "PASSED" : "FAILED";
    this.writeReport(finalStatus);
  }

  buildSummary(status) {
    const counts = {
      total: this.totalTests,
      passed: 0,
      failed: 0,
      skipped: 0,
      flaky: 0,
      running: 0,
    };

    for (const entry of this.entries.values()) {
      if (entry.status === "PASSED") {
        counts.passed += 1;
      } else if (entry.status === "FAILED") {
        counts.failed += 1;
      } else if (entry.status === "SKIPPED") {
        counts.skipped += 1;
      } else if (entry.status === "FLAKY") {
        counts.flaky += 1;
      } else {
        counts.running += 1;
      }
    }

    const endedAt = this.finishedAt || new Date();
    const durationMs = this.startedAt ? endedAt - this.startedAt : 0;

    return {
      status,
      counts,
      startedAt: this.startedAt,
      finishedAt: this.finishedAt,
      durationMs,
    };
  }

  buildStepsHtml() {
    const entries = Array.from(this.entries.values()).sort(
      (left, right) => left.order - right.order
    );

    if (!entries.length) {
      return `
        <tr>
          <td colspan="5" style="padding: 16px; text-align: center; color: #6c757d;">
            Waiting for test results...
          </td>
        </tr>
      `;
    }

    return entries
      .map((entry) => {
        const appearance = statusAppearance(entry.status);
        const description = escapeHtml(
          entry.titlePath.filter(Boolean).join(" > ") || entry.title
        );
        const location = entry.line
          ? `${entry.file}:${entry.line}`
          : entry.file;

        return `
          <tr>
            <td data-label="Step" style="padding: 12px; border-bottom: 1px solid #dee2e6;">
              <span style="color: ${appearance.color}; font-weight: bold; margin-right: 8px;">${appearance.icon}</span>
              ${entry.order}
            </td>
            <td data-label="Description" style="padding: 12px; border-bottom: 1px solid #dee2e6;">
              <div style="font-weight: 600; color: #212529;">${description}</div>
              <div style="font-size: 12px; color: #6c757d; margin-top: 4px;">${escapeHtml(location)}</div>
            </td>
            <td data-label="Status" style="padding: 12px; border-bottom: 1px solid #dee2e6;">
              <span style="color: ${appearance.color}; font-weight: bold;">${entry.status}</span>
            </td>
            <td data-label="Duration" style="padding: 12px; border-bottom: 1px solid #dee2e6;">${escapeHtml(
              formatDuration(entry.duration)
            )}</td>
            <td data-label="Timestamp" style="padding: 12px; border-bottom: 1px solid #dee2e6;">${escapeHtml(
              formatDate(entry.finishedAt)
            )}</td>
          </tr>
        `;
      })
      .join("");
  }

  buildFailureHtml() {
    const failedEntries = Array.from(this.entries.values()).filter(
      (entry) => entry.status === "FAILED"
    );

    const sections = failedEntries.map((entry) => {
      const attachmentHtml = entry.attachments.length
        ? `
            <ul style="margin: 8px 0 0 16px; padding: 0;">
              ${entry.attachments
                .map(
                  (attachment) => `
                    <li style="margin-bottom: 4px;">
                      <strong>${escapeHtml(attachment.name)}:</strong> ${escapeHtml(
                        attachment.path
                      )}
                    </li>
                  `
                )
                .join("")}
            </ul>
          `
        : "<p style=\"margin: 0;\">No attachments were captured.</p>";

      return `
        <div class="failure-card" style="background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px; padding: 20px; margin-top: 20px;">
          <h3 style="color: #721c24; margin-top: 0;">Failure: ${escapeHtml(
            entry.title
          )}</h3>
          <p class="meta-line"><strong>Test File:</strong> ${escapeHtml(entry.file)}</p>
          <p class="meta-line"><strong>Finished At:</strong> ${escapeHtml(
            formatDate(entry.finishedAt)
          )}</p>
          <p><strong>Retry:</strong> ${escapeHtml(entry.retry)}</p>
          <p><strong>Error Message:</strong></p>
          <pre class="report-pre" style="background-color: #fff; padding: 10px; border-radius: 3px; overflow-x: auto; white-space: pre-wrap;">${escapeHtml(
            entry.errorMessage || entry.errorStack || "No error details available."
          )}</pre>
          <p><strong>Artifacts:</strong></p>
          ${attachmentHtml}
        </div>
      `;
    });

    const globalErrorHtml = this.globalErrors
      .map(
        (message) => `
          <div class="failure-card" style="background-color: #fff3cd; border: 1px solid #ffeeba; border-radius: 5px; padding: 16px; margin-top: 20px;">
            <h3 style="color: #856404; margin-top: 0;">Runner Error</h3>
            <pre class="report-pre" style="background-color: #fff; padding: 10px; border-radius: 3px; overflow-x: auto; white-space: pre-wrap;">${escapeHtml(
              message
            )}</pre>
          </div>
        `
      )
      .join("");

    return `${sections.join("")}${globalErrorHtml}`;
  }

  writeReport(status) {
    const summary = this.buildSummary(status);
    const appearance = statusAppearance(summary.status);
    const failureHtml = this.buildFailureHtml();
    const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Playwright E2E Report</title>
    <style>
      body.report-body {
        margin: 0;
      }

      .report-shell {
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 30px;
      }

      .summary-table td,
      .steps-table td,
      .steps-table th {
        word-break: break-word;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 12px;
        margin-bottom: 30px;
      }

      .steps-wrap {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }

      .steps-table {
        width: 100%;
        min-width: 720px;
        border-collapse: collapse;
        margin-top: 20px;
        background-color: white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }

      .report-pre,
      .meta-line {
        word-break: break-word;
      }

      @media screen and (max-width: 640px) {
        body.report-body {
          padding: 12px !important;
        }

        .report-shell {
          padding: 18px !important;
        }

        .report-title {
          font-size: 26px !important;
        }

        .summary-heading {
          font-size: 24px !important;
          line-height: 1.3 !important;
        }

        .summary-table,
        .summary-table tbody,
        .summary-table tr,
        .summary-table td {
          display: block;
          width: 100% !important;
        }

        .summary-table td {
          padding: 4px 0 !important;
        }

        .stats-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
        }

        .steps-table {
          min-width: 640px;
          font-size: 12px;
        }

        .failure-card {
          padding: 16px !important;
        }

        .footer-block {
          text-align: left !important;
        }
      }

      @media screen and (max-width: 420px) {
        .stats-grid {
          grid-template-columns: 1fr !important;
        }

        .report-shell {
          padding: 16px !important;
        }

        .steps-table {
          min-width: 560px;
        }
      }
    </style>
  </head>
  <body class="report-body" style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 960px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
    <div class="report-shell" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); padding: 30px;">
      <div style="text-align: center; border-bottom: 3px solid ${appearance.color}; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 class="report-title" style="color: #2c3e50; margin: 0 0 10px 0;">AGD Law E2E Test Report</h1>
        <p style="color: #7f8c8d; margin: 0; font-size: 14px;">Automated Playwright execution summary for Jenkins email delivery</p>
      </div>

      <div style="background-color: ${appearance.color}; color: white; border-radius: 5px; padding: 20px; margin-bottom: 30px;">
        <h2 class="summary-heading" style="margin: 0 0 15px 0;">
          <span style="font-size: 32px; margin-right: 10px; vertical-align: middle;">${appearance.icon}</span>
          Suite Status: ${escapeHtml(summary.status)}
        </h2>
        <table class="summary-table" style="width: 100%; color: white; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0;"><strong>Start Time:</strong> ${escapeHtml(
              formatDate(summary.startedAt)
            )}</td>
            <td style="padding: 6px 0;"><strong>End Time:</strong> ${escapeHtml(
              formatDate(summary.finishedAt)
            )}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0;"><strong>Duration:</strong> ${escapeHtml(
              formatDuration(summary.durationMs)
            )}</td>
            <td style="padding: 6px 0;"><strong>Application:</strong> ${escapeHtml(
              this.baseURL
            )}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0;"><strong>Total Tests:</strong> ${escapeHtml(
              summary.counts.total
            )}</td>
            <td style="padding: 6px 0;"><strong>Build:</strong> ${escapeHtml(
              process.env.BUILD_NUMBER || "Local Run"
            )}</td>
          </tr>
        </table>
      </div>

      <div class="stats-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 30px;">
        <div style="background: #eaf7ee; border-radius: 5px; padding: 14px; text-align: center;">
          <div style="font-size: 24px; font-weight: 700; color: #28a745;">${summary.counts.passed}</div>
          <div style="font-size: 12px; color: #5f6b7a;">Passed</div>
        </div>
        <div style="background: #fdecec; border-radius: 5px; padding: 14px; text-align: center;">
          <div style="font-size: 24px; font-weight: 700; color: #dc3545;">${summary.counts.failed}</div>
          <div style="font-size: 12px; color: #5f6b7a;">Failed</div>
        </div>
        <div style="background: #fff4e5; border-radius: 5px; padding: 14px; text-align: center;">
          <div style="font-size: 24px; font-weight: 700; color: #fd7e14;">${summary.counts.flaky}</div>
          <div style="font-size: 12px; color: #5f6b7a;">Flaky</div>
        </div>
        <div style="background: #f1f3f5; border-radius: 5px; padding: 14px; text-align: center;">
          <div style="font-size: 24px; font-weight: 700; color: #6c757d;">${summary.counts.skipped}</div>
          <div style="font-size: 12px; color: #5f6b7a;">Skipped</div>
        </div>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Test Execution Steps</h2>
        <div class="steps-wrap">
          <table class="steps-table" style="width: 100%; border-collapse: collapse; margin-top: 20px; background-color: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <thead>
              <tr style="background-color: #3498db; color: white;">
                <th style="padding: 12px; text-align: left; width: 10%;">Step</th>
                <th style="padding: 12px; text-align: left; width: 45%;">Description</th>
                <th style="padding: 12px; text-align: left; width: 15%;">Status</th>
                <th style="padding: 12px; text-align: left; width: 15%;">Duration</th>
                <th style="padding: 12px; text-align: left; width: 15%;">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              ${this.buildStepsHtml()}
            </tbody>
          </table>
        </div>
      </div>

      ${failureHtml}

      <div class="footer-block" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center; color: #7f8c8d; font-size: 12px;">
        <p style="margin: 4px 0;">This is an automated Playwright report generated for Jenkins CI/CD.</p>
        <p style="margin: 4px 0;">Job: ${escapeHtml(
          process.env.JOB_NAME || "Local Run"
        )} | Build URL: ${escapeHtml(process.env.BUILD_URL || "N/A")}</p>
        <p style="margin: 4px 0;">Report File: ${escapeHtml(this.outputFile)}</p>
      </div>
    </div>
  </body>
</html>
    `.trim();

    fs.mkdirSync(path.dirname(this.outputFile), { recursive: true });
    fs.writeFileSync(this.outputFile, html, "utf8");
  }
}

module.exports = EmailHtmlReporter;
