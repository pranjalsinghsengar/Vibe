// import React from "react";
// import { jsPDF } from "jspdf";

// const DownloadChatPDF = ({ selectedCustomer, messages, phoneNumber, token }) => {
//   const downloadChatAsPDF = () => {
//     if (!selectedCustomer) {
//       alert("Please select a customer to download the chat.");
//       return;
//     }
//     if (!messages?.length) {
//       alert("No chat messages available to download.");
//       return;
//     }

//     /* ─────────────────────────  INIT  ───────────────────────── */
//     const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
//     const MARGIN_L = 15;
//     const MARGIN_T = 20;
//     const PAGE_W = 180; // printable width on A4
//     const MAX_H = 270; // printable height
//     const LINE_H = 7; // line height for better spacing
//     const GAP = 10; // gap between messages
//     const BOTTOM_MARGIN = 10; // margin from bottom of page
//     const HEADER_H = 16; // header height

//     /* ───────────────────────── COVER  ───────────────────────── */
//     doc.setFillColor(245, 247, 250);
//     doc.rect(0, 0, 210, 297, "F");

//     doc.setFillColor(26, 43, 68);
//     doc.rect(0, 0, 210, 85, "F");

//     doc.setFillColor(52, 86, 136);
//     doc.rect(0, 85, 210, 10, "F");

//     doc.setDrawColor(212, 160, 23);
//     doc.setLineWidth(0.6);
//     doc.rect(8, 8, 194, 281, "S");

//     doc.setFont("Helvetica", "bold");
//     doc.setFontSize(38);
//     doc.setTextColor(255, 255, 255);
//     doc.text("Chat Transcript", MARGIN_L, 48);

//     doc.setFontSize(18);
//     doc.setTextColor(212, 160, 23);
//     // doc.text(`Customer ID: ${selectedCustomer}`, MARGIN_L, 64);
//     doc.text(`Customer ID: ${"*".repeat(selectedCustomer.length - 4) + selectedCustomer.slice(-4)}`, MARGIN_L, 64);

//     doc.setFont("Helvetica", "italic");
//     doc.setFontSize(13);
//     doc.setTextColor(200, 200, 200);
//     doc.text("Empowering Conversations with ChatApp", MARGIN_L, 72);

//     doc.setFont("Helvetica", "normal");
//     doc.setFontSize(11);
//     doc.text(`Generated: ${new Date().toLocaleString()}`, MARGIN_L, 80);

//     /* summary table */
//     let y = 105;
//     doc.setFont("Helvetica", "bold").setFontSize(16).setTextColor(26, 43, 68);
//     doc.text("Conversation Summary", MARGIN_L, y);
//     doc.setDrawColor(212, 160, 23).setLineWidth(0.4);
//     doc.line(MARGIN_L, y + 2, MARGIN_L + 70, y + 2);

//     y += 12;
//     doc.setFont("Helvetica", "normal").setFontSize(11);
//     const maskedPhoneNumber = phoneNumber !== "N/A" ? "*".repeat(phoneNumber.length - 4) + phoneNumber.slice(-4) : "N/A";
//     const rows = [
//       ["Phone Number", maskedPhoneNumber],
//       ["Total Messages", messages.length],
//       ["Start Time", messages[0]?.timestamp ? new Date(parseInt(messages[0].timestamp) * 1000).toLocaleString() : "N/A"],
//       ["End Time", messages[messages.length - 1]?.timestamp ? new Date(parseInt(messages[messages.length - 1].timestamp) * 1000).toLocaleString() : "N/A"],
//     ];
//     rows.forEach(([k, v]) => {
//       doc.setFillColor(235, 240, 245);
//       doc.rect(MARGIN_L, y - 4, PAGE_W, 10, "F");
//       doc.setTextColor(50, 50, 50);
//       doc.text(`${k}:`, MARGIN_L + 5, y + 2);
//       doc.text(`${v}`, MARGIN_L + 50, y + 2);
//       y += 12;
//     });

//     /* watermark */
//     doc.setFontSize(60).setTextColor(230, 230, 230);
//     doc.text("ChatApp", 40, 220, { angle: 45 });

//     /* ──────────────────────── CHAT PAGES ─────────────────────── */
//     doc.addPage();
//     y = MAX_H - BOTTOM_MARGIN; // start at bottom of page

//     const header = () => {
//       doc.setFillColor(26, 43, 68).rect(0, 0, 210, HEADER_H, "F");
//       doc.setDrawColor(212, 160, 23).line(15, HEADER_H, 195, HEADER_H);
//       doc.setFont("Helvetica", "bold").setFontSize(13).setTextColor(255, 255, 255);
//       doc.text("ChatApp Transcript", MARGIN_L, 12);
//       doc.setFont("Helvetica", "normal").setFontSize(9).setTextColor(212, 160, 23);
//     //   doc.text(`Customer ${selectedCustomer}`, 195, 12, { align: "right" });
//       doc.text(`Customer ${"*".repeat(selectedCustomer.length - 4) + selectedCustomer.slice(-4)}`, 195, 12, { align: "right" });
//     };
//     header();

//     // Pre-calculate bubble heights for all messages
//     const bubbleHeights = messages.map((m) => {
//       const isCustomer = m.type === "request";
//       const BUBBLE_W = PAGE_W * 0.6;

//       let content = "";
//       if (m.type === "request") {
//         if (m.contentType === "text") {
//           content = m.body_payload.entry[0].changes[0].value.messages[0].text.body;
//         } else if (m.contentType === "interactive") {
//           const interactive = m.body_payload.entry[0].changes[0].value.messages[0].interactive;
//           if (interactive.type === "button_reply") {
//             content = interactive.button_reply.title;
//           } else if (interactive.type === "list_reply") {
//             content = interactive.list_reply.title;
//           } else {
//             content = m.content || "Interactive message";
//           }
//         } else {
//           content = m.content || "Unsupported request type";
//         }
//       } else if (m.type === "response") {
//         if (m.contentType === "text" && m.content.text?.body) {
//           content = m.content.text.body;
//         } else if (m.contentType === "interactive") {
//           const interactive = m.content.interactive;
//           if (interactive.type === "list") {
//             content = `${interactive.body.text}\n${interactive.action.sections[0].rows.map(row => `• ${row.title}`).join("\n")}`;
//           } else if (interactive.type === "button") {
//             content = `${interactive.body.text}\n${interactive.action.buttons.map(button => `• ${button.reply.title}`).join("\n")}`;
//           } else {
//             content = "Interactive response";
//           }
//         } else {
//           content = "Unsupported response type";
//         }
//       }

//       const extraLines = (content.match(/\n/g) || []).length;
//       doc.setFont("Helvetica", "normal");
//       doc.setFontSize(10);
//       const lines = doc.splitTextToSize(content, BUBBLE_W - 10);
//       const textHeight = (lines.length + extraLines) * LINE_H;
//       return textHeight + 20; // padding for sender, timestamp, margins
//     });

//     // Render messages from bottom-up (latest message at bottom)
//     let currentPageHeight = MAX_H - BOTTOM_MARGIN - HEADER_H;
//     let messageIndex = messages.length - 1; // start from last message

//     while (messageIndex >= 0) {
//       const m = messages[messageIndex];
//       const bubbleH = bubbleHeights[messageIndex];
//       const isCustomer = m.type === "request";
//       const BUBBLE_W = PAGE_W * 0.6;
//       const X = isCustomer ? MARGIN_L : MARGIN_L + (PAGE_W - BUBBLE_W);

//       // Check if message fits on current page
//       if (y - bubbleH < MARGIN_T + HEADER_H) {
//         doc.addPage();
//         header();
//         y = MAX_H - BOTTOM_MARGIN;
//         currentPageHeight = MAX_H - BOTTOM_MARGIN - HEADER_H;
//       }

//       /* build content string */
//       let content = "";
//       if (m.type === "request") {
//         if (m.contentType === "text") {
//           content = m.body_payload.entry[0].changes[0].value.messages[0].text.body;
//         } else if (m.contentType === "interactive") {
//           const interactive = m.body_payload.entry[0].changes[0].value.messages[0].interactive;
//           if (interactive.type === "button_reply") {
//             content = interactive.button_reply.title;
//           } else if (interactive.type === "list_reply") {
//             content = interactive.list_reply.title;
//           } else {
//             content = m.content || "Interactive message";
//           }
//         } else {
//           content = m.content || "Unsupported request type";
//         }
//       } else if (m.type === "response") {
//         if (m.contentType === "text" && m.content.text?.body) {
//           content = m.content.text.body;
//         } else if (m.contentType === "interactive") {
//           const interactive = m.content.interactive;
//           if (interactive.type === "list") {
//             content = `${interactive.body.text}\n${interactive.action.sections[0].rows.map(row => `• ${row.title}`).join("\n")}`;
//           } else if (interactive.type === "button") {
//             content = `${interactive.body.text}\n${interactive.action.buttons.map(button => `• ${button.reply.title}`).join("\n")}`;
//           } else {
//             content = "Interactive response";
//           }
//         } else {
//           content = "Unsupported response type";
//         }
//       }

//       const extraLines = (content.match(/\n/g) || []).length;
//       const lines = doc.splitTextToSize(content, BUBBLE_W - 10);

//       /* bubble background + border */
//       doc.setFillColor(isCustomer ? 225 : 235, isCustomer ? 240 : 245, isCustomer ? 250 : 255);
//       doc.roundedRect(X, y - bubbleH, BUBBLE_W, bubbleH, 6, 6, "F");
//       doc.setDrawColor(190, 190, 190).setLineWidth(0.2);
//       doc.roundedRect(X, y - bubbleH, BUBBLE_W, bubbleH, 6, 6, "S");

//       /* sender & timestamp */
//       doc.setFont("Helvetica", "bold");
//       doc.setFontSize(11);
//       doc.setTextColor(26, 43, 68);
//       doc.text(m.contactName || "Unknown", X + 6, y - bubbleH + 5);
//       doc.setFont("Helvetica", "italic");
//       doc.setFontSize(8);
//       doc.setTextColor(120, 120, 120);
//       doc.text(
//         m.timestamp ? new Date(parseInt(m.timestamp) * 1000).toLocaleTimeString() : "N/A",
//         X + 6,
//         y - bubbleH + 10
//       );

//       /* message body */
//       doc.setFont("Helvetica", "normal");
//       doc.setFontSize(10);
//       doc.setTextColor(30, 30, 30);
//       doc.text(lines, X + 5, y - bubbleH + 19);

//       y -= (bubbleH + GAP); // move up for next message
//       messageIndex--;
//     }

//     /* ───────────────────────── FOOTER ───────────────────────── */
//     const pages = doc.internal.getNumberOfPages();
//     for (let i = 1; i <= pages; i++) {
//       doc.setPage(i);
//       doc.setFillColor(26, 43, 68).rect(0, 287, 210, 10, "F");
//       doc.setFillColor(52, 86, 136).rect(0, 287, 210, 3, "F");
//       doc.setFont("Helvetica", "normal").setFontSize(8).setTextColor(255, 255, 255);
//       doc.text(
//         `Page ${i} of ${pages} | ChatApp © ${new Date().getFullYear()} | support@chatapp.com`,
//         105,
//         292,
//         { align: "center" }
//       );
//     }

//     doc.save(`chat_transcript_${selectedCustomer}.pdf`);
//   };

//   return (
//     <button
//       onClick={downloadChatAsPDF}
//       className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-xs disabled:opacity-50"
//       disabled={!selectedCustomer || !messages?.length}
//     >
//       Download Chat PDF
//     </button>
//   );
// };

// export default DownloadChatPDF;















import React, { useState, useEffect } from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import axios from "axios";
import { apiurl } from "../config/config";

// Styles for the PDF
const styles = StyleSheet.create({
  page: { padding: 20, fontFamily: "Helvetica", fontSize: 12, color: "#333" },
  coverPage: { backgroundColor: "#F5F7FA", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" },
  coverHeader: { backgroundColor: "#1A2B44", width: "100%", padding: 20, textAlign: "center", color: "#FFF", fontSize: 24, fontWeight: "bold" },
  coverSubHeader: { backgroundColor: "#345688", width: "100%", padding: 5, color: "#D4A017", fontSize: 16, textAlign: "center" },
  coverTitle: { marginTop: 20, fontSize: 36, color: "#1A2B44", fontWeight: "bold" },
  coverSubtitle: { fontSize: 14, color: "#888", fontStyle: "italic", marginTop: 5 },
  coverInfo: { fontSize: 12, color: "#666", marginTop: 10 },
  watermark: { position: "absolute", fontSize: 60, color: "#E6E6E6", transform: "rotate(45deg)", opacity: 0.3, top: 400, left: 150 },
  summarySection: { marginTop: 20, width: "100%", paddingHorizontal: 20 },
  summaryTitle: { fontSize: 18, color: "#1A2B44", fontWeight: "bold", borderBottom: "1 solid #D4A017", paddingBottom: 5 },
  summaryRow: { flexDirection: "row", backgroundColor: "#EBF0F5", padding: 8, marginTop: 5, borderRadius: 5 },
  summaryLabel: { width: "40%", fontWeight: "bold", color: "#333" },
  summaryValue: { width: "60%", color: "#555" },
  header: { backgroundColor: "#1A2B44", width: "100%", padding: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerText: { color: "#FFF", fontSize: 14, fontWeight: "bold" },
  headerSubText: { color: "#D4A017", fontSize: 10 },
  chatContainer: { marginTop: 20, flexDirection: "column", gap: 10 },
  messageBubble: { maxWidth: "60%", padding: 10, borderRadius: 10, borderWidth: 1, borderColor: "#CCC" },
  customerBubble: { backgroundColor: "#E1F0FA", alignSelf: "flex-start" },
  botBubble: { backgroundColor: "#E6F5FF", alignSelf: "flex-end" },
  sender: { fontSize: 11, fontWeight: "bold", color: "#1A2B44" },
  timestamp: { fontSize: 8, color: "#888", fontStyle: "italic", marginTop: 2 },
  messageText: { fontSize: 10, marginTop: 5 },
  image: { width: 100, height: 100, marginTop: 5, borderRadius: 5 },
  dateSeparator: { textAlign: "center", fontSize: 9, color: "#666", marginVertical: 5 },
  footer: { position: "absolute", bottom: 10, left: 0, right: 0, textAlign: "center", fontSize: 8, color: "#FFF", backgroundColor: "#1A2B44", padding: 5 },
  footerAccent: { backgroundColor: "#345688", width: "100%", height: 3, position: "absolute", top: 0 },
});

// Helper function to estimate message height (in points)
const estimateMessageHeight = (msg, renderMessageContent) => {
  const LINE_HEIGHT = 14; // Adjusted for better accuracy (fontSize: 10 + margin)
  const SENDER_HEIGHT = 14; // Height for sender name (fontSize: 11 + margin)
  const TIMESTAMP_HEIGHT = 10; // Height for timestamp (fontSize: 8 + margin)
  const PADDING = 24; // Total padding inside the bubble (10 top + 10 bottom + 4 for safety)
  const IMAGE_HEIGHT = msg.contentType === "image" ? 110 : 0; // 100 (image) + 10 (margin)

  // Estimate text height
  const content = renderMessageContent(msg);
  const BUBBLE_WIDTH = (595 - 40) * 0.6; // A4 width (595pt) - padding (40pt) * 60% max width
  const CHARACTERS_PER_LINE = 50; // Rough estimate of characters per line at fontSize 10
  const lines = Math.ceil(content.length / CHARACTERS_PER_LINE) + (content.split("\n").length - 1); // Estimate lines with wrapping
  const textHeight = lines * LINE_HEIGHT;

  // Total height: sender + timestamp + text + image (if any) + padding + safety buffer
  const totalHeight = SENDER_HEIGHT + TIMESTAMP_HEIGHT + textHeight + IMAGE_HEIGHT + PADDING + 10; // 10pt buffer
  return totalHeight;
};

// Helper function to group messages by page
const groupMessagesByPage = (messages, renderMessageContent) => {
  const PAGE_HEIGHT = 842 - 40 - 30; // A4 height (842pt) - padding (20pt top + 20pt bottom) - footer (30pt)
  const HEADER_HEIGHT = 40; // Approximate header height with padding
  const GAP = 10; // Gap between messages
  const DATE_SEPARATOR_HEIGHT = 20; // Height for date separator

  const groupedPages = [];
  let currentPageMessages = [];
  let currentPageHeight = HEADER_HEIGHT;
  let lastDate = null;

  messages.forEach((msg) => {
    const msgHeight = estimateMessageHeight(msg, renderMessageContent);
    const msgDate = msg.timestamp ? new Date(parseInt(msg.timestamp) * 1000).toLocaleDateString() : null;
    const needsDateSeparator = msgDate && msgDate !== lastDate;

    let additionalHeight = msgHeight;
    if (needsDateSeparator) {
      additionalHeight += DATE_SEPARATOR_HEIGHT;
    }

    // Check if adding this message exceeds the page height
    if (currentPageHeight + additionalHeight + GAP > PAGE_HEIGHT) {
      if (currentPageMessages.length > 0) {
        groupedPages.push(currentPageMessages);
      }
      currentPageMessages = [];
      currentPageHeight = HEADER_HEIGHT;
    }

    currentPageMessages.push({ msg, date: msgDate, showDateSeparator: needsDateSeparator });
    currentPageHeight += additionalHeight + GAP;
    lastDate = msgDate;
  });

  // Add the last page if there are remaining messages
  if (currentPageMessages.length > 0) {
    groupedPages.push(currentPageMessages);
  }

  return groupedPages;
};

const ChatPDFDocument = ({ selectedCustomer, messages, phoneNumber, imageUrls }) => {
  const maskedCustomerId = selectedCustomer ? "*".repeat(selectedCustomer.length - 4) + selectedCustomer.slice(-4) : "N/A";
  const maskedPhoneNumber = phoneNumber !== "N/A" ? "*".repeat(phoneNumber.length - 4) + phoneNumber.slice(-4) : "N/A";

  const renderMessageContent = (msg) => {
    if (msg.type === "request") {
      if (msg.contentType === "text") {
        return msg.body_payload.entry[0].changes[0].value.messages[0].text.body;
      } else if (msg.contentType === "image") {
        return "Image Message";
      } else if (msg.contentType === "interactive") {
        const interactive = msg.body_payload.entry[0].changes[0].value.messages[0].interactive;
        if (interactive.type === "button_reply") {
          return interactive.button_reply.title;
        } else if (interactive.type === "list_reply") {
          return interactive.list_reply.title;
        }
        return msg.content || "Interactive message";
      }
    } else if (msg.type === "response") {
      if (msg.contentType === "text" && msg.content.text?.body) {
        return msg.content.text.body;
      } else if (msg.contentType === "interactive") {
        const interactive = msg.content.interactive;
        if (interactive.type === "list") {
          return `${interactive.body.text}\n${interactive.action.sections[0].rows.map(row => `• ${row.title}`).join("\n")}`;
        } else if (interactive.type === "button") {
          return `${interactive.body.text}\n${interactive.action.buttons.map(button => `• ${button.reply.title}`).join("\n")}`;
        }
        return "Interactive response";
      }
    }
    return "Unsupported message type";
  };

  // Group messages into pages
  const groupedPages = groupMessagesByPage(messages, renderMessageContent);

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.coverPage}>
          <View style={styles.coverHeader}>
            <Text>ChatApp</Text>
          </View>
          <View style={styles.coverSubHeader}>
            <Text>Customer ID: {maskedCustomerId}</Text>
          </View>
          <Text style={styles.coverTitle}>Chat Transcript</Text>
          <Text style={styles.coverSubtitle}>Empowering Conversations with ChatApp</Text>
          <Text style={styles.coverInfo}>Generated: {new Date().toLocaleString()}</Text>
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Conversation Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Phone Number:</Text>
              <Text style={styles.summaryValue}>{maskedPhoneNumber}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Messages:</Text>
              <Text style={styles.summaryValue}>{messages.length}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Start Time:</Text>
              <Text style={styles.summaryValue}>
                {messages[0]?.timestamp ? new Date(parseInt(messages[0].timestamp) * 1000).toLocaleString() : "N/A"}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>End Time:</Text>
              <Text style={styles.summaryValue}>
                {messages[messages.length - 1]?.timestamp ? new Date(parseInt(messages[messages.length - 1].timestamp) * 1000).toLocaleString() : "N/A"}
              </Text>
            </View>
          </View>
          <Text style={styles.watermark}>ChatApp</Text>
        </View>
      </Page>

      {/* Chat Pages */}
      {groupedPages.map((pageMessages, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page} wrap>
          <View style={styles.header}>
            <Text style={styles.headerText}>ChatApp Transcript</Text>
            <Text style={styles.headerSubText}>Customer {maskedCustomerId}</Text>
          </View>
          <View style={styles.chatContainer}>
            {pageMessages.map(({ msg, showDateSeparator, date }, msgIndex) => (
              <View key={msg._id} wrap={false}>
                {/* {showDateSeparator && (
                  <Text style={styles.dateSeparator}>{date}</Text>
                )} */}
                <View style={[styles.messageBubble, msg.type === "request" ? styles.customerBubble : styles.botBubble]}>
                  <Text style={styles.sender}>{msg.contactName || "Unknown"}</Text>
                  <Text style={styles.timestamp}>
                    {msg.timestamp ? new Date(parseInt(msg.timestamp) * 1000).toLocaleTimeString() : "N/A"}
                  </Text>
                  <Text style={styles.messageText}>{renderMessageContent(msg)}</Text>
                  {msg.contentType === "image" && imageUrls[msg._id] && (
                    <Image style={styles.image} src={imageUrls[msg._id]} />
                  )}
                </View>
              </View>
            ))}
          </View>
          <View style={styles.footer}>
            <View style={styles.footerAccent} />
            <Text>
              Page {pageIndex + 2} of {groupedPages.length + 1} | ChatApp © {new Date().getFullYear()} | support@chatapp.com
            </Text>
          </View>
        </Page>
      ))}
    </Document>
  );
};

const DownloadChatPDF = ({ selectedCustomer, messages, phoneNumber, token }) => {
  const [imageUrls, setImageUrls] = useState({});

  // Fetch images for messages with contentType === "image"
  useEffect(() => {
    const fetchImages = async () => {
      const imageMessages = messages.filter((msg) => msg.contentType === "image");
      const newImageUrls = { ...imageUrls };

      for (const msg of imageMessages) {
        if (!newImageUrls[msg._id]) {
          try {
            const response = await axios.get(
              `${apiurl}/vibeconnect/api/whatsapp/dashboard/getMediaById?account_id=30001&media_id=${msg.content}`,
              {
                headers: { Authorization: `Bearer ${token}` },
                responseType: "arraybuffer", // Expect binary data
              }
            );
            const base64 = btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            newImageUrls[msg._id] = `data:image/jpeg;base64,${base64}`;
          } catch (error) {
            console.error("Error fetching image for PDF:", error);
            newImageUrls[msg._id] = null;
          }
        }
      }
      setImageUrls(newImageUrls);
    };

    if (messages?.length) {
      fetchImages();
    }
  }, [messages, token]);

  const isReady = messages?.length && Object.keys(imageUrls).length === messages.filter((msg) => msg.contentType === "image").length;

  return (
    <div>
      {isReady ? (
        <PDFDownloadLink
          document={<ChatPDFDocument selectedCustomer={selectedCustomer} messages={messages} phoneNumber={phoneNumber} imageUrls={imageUrls} />}
          fileName={`chat_transcript_${selectedCustomer}.pdf`}
        >
          {({ loading }) => (
            <button
              className="border border-primary hover:bg-primary text-primary hover:text-white py-2 px-4 rounded text-xs disabled:opacity-50"
              disabled={loading || !selectedCustomer || !messages?.length}
            >
              {loading ? "Generating PDF..." : "Download Chat PDF"}
            </button>
          )}
        </PDFDownloadLink>
      ) : (
        <button
          className="border border-primary hover:bg-primary text-primary hover:text-white py-2 px-4 rounded text-xs disabled:opacity-50"
          disabled
        >
          {/* Preparing PDF... */}
          Download Chat PDF
        </button>
      )}
    </div>
  );
};

export default DownloadChatPDF;