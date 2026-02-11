import { Resend } from 'resend';
import { Reservation } from '@/types';
import {
  BUSINESS_NAME,
  BUSINESS_ADDRESS,
  CONTACT_INFO,
  formatDate,
  getTimeSlotLabel,
  getCartTypeLabel,
  getPriceForReservation,
  formatPrice
} from '@/lib/utils';

// Initialize Resend lazily to avoid build errors when API key is not set
let resend: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    return null;
  }
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

function getFromEmail(): string {
  return `${BUSINESS_NAME} <noreply@${process.env.RESEND_DOMAIN || 'resend.dev'}>`;
}

function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || '';
}

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

// Email template helper
function getEmailStyles() {
  return `
    body { font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1F2937; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #B91C1C; color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { padding: 30px 20px; background-color: #ffffff; }
    .details-box { background-color: #F9FAFB; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #E5E7EB; }
    .detail-row:last-child { border-bottom: none; }
    .label { color: #6B7280; }
    .value { font-weight: 600; }
    .price { color: #B91C1C; font-size: 24px; font-weight: bold; }
    .warning { background-color: #FEF3C7; border: 1px solid #D97706; border-radius: 8px; padding: 15px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #6B7280; font-size: 14px; }
    .btn { display: inline-block; background-color: #B91C1C; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 10px 0; }
  `;
}

// Send reservation request received email (to customer)
export async function sendReservationRequestEmail(reservation: Reservation) {
  const resendClient = getResend();
  if (!resendClient) {
    console.log('Resend API key not configured, skipping email');
    return;
  }

  const price = getPriceForReservation(reservation.cart_type, reservation.time_slot);

  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>${getEmailStyles()}</style></head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${BUSINESS_NAME}</h1>
        </div>
        <div class="content">
          <h2>Reservation Request Received</h2>
          <p>Dear ${reservation.name},</p>
          <p>Thank you for your reservation request! We've received your information and will review it shortly.</p>

          <div class="details-box">
            <h3 style="margin-top: 0;">Reservation Details</h3>
            <div class="detail-row">
              <span class="label">Date</span>
              <span class="value">${formatDate(reservation.rental_date)}</span>
            </div>
            <div class="detail-row">
              <span class="label">Time</span>
              <span class="value">${getTimeSlotLabel(reservation.time_slot)}</span>
            </div>
            <div class="detail-row">
              <span class="label">Cart</span>
              <span class="value">${getCartTypeLabel(reservation.cart_type)}</span>
            </div>
            <div class="detail-row">
              <span class="label">Price</span>
              <span class="price">${formatPrice(price)}</span>
            </div>
          </div>

          <p><strong>What happens next?</strong></p>
          <p>Our team will review your request and check availability. You will receive another email once your reservation is confirmed.</p>

          <p>Questions? Text us at <strong>${CONTACT_INFO.phone}</strong></p>
        </div>
        <div class="footer">
          <p>${BUSINESS_NAME} | ${BUSINESS_ADDRESS} | Round Top (Warrenton), Texas</p>
          <p>Phone: ${CONTACT_INFO.phone} (text preferred)</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await resendClient.emails.send({
      from: getFromEmail(),
      to: reservation.email,
      subject: `Reservation Request Received - ${BUSINESS_NAME}`,
      html,
    });
    console.log('Reservation request email sent to customer');
  } catch (error) {
    console.error('Failed to send reservation request email:', error);
    throw error;
  }
}

// Send new reservation alert to admin
export async function sendAdminNotificationEmail(reservation: Reservation) {
  const resendClient = getResend();
  const adminEmail = getAdminEmail();

  if (!resendClient || !adminEmail) {
    console.log('Resend API key or admin email not configured, skipping email');
    return;
  }

  const price = getPriceForReservation(reservation.cart_type, reservation.time_slot);

  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>${getEmailStyles()}</style></head>
    <body>
      <div class="container">
        <div class="header" style="background-color: #D97706;">
          <h1>New Reservation Request</h1>
        </div>
        <div class="content">
          <p>A new reservation request has been submitted:</p>

          <div class="details-box">
            <h3 style="margin-top: 0;">Customer Information</h3>
            <div class="detail-row">
              <span class="label">Name</span>
              <span class="value">${reservation.name}</span>
            </div>
            <div class="detail-row">
              <span class="label">Email</span>
              <span class="value">${reservation.email}</span>
            </div>
            <div class="detail-row">
              <span class="label">Phone</span>
              <span class="value">${reservation.phone}</span>
            </div>
          </div>

          <div class="details-box">
            <h3 style="margin-top: 0;">Reservation Details</h3>
            <div class="detail-row">
              <span class="label">Date</span>
              <span class="value">${formatDate(reservation.rental_date)}</span>
            </div>
            <div class="detail-row">
              <span class="label">Time</span>
              <span class="value">${getTimeSlotLabel(reservation.time_slot)}</span>
            </div>
            <div class="detail-row">
              <span class="label">Cart</span>
              <span class="value">${getCartTypeLabel(reservation.cart_type)}</span>
            </div>
            <div class="detail-row">
              <span class="label">Price</span>
              <span class="price">${formatPrice(price)}</span>
            </div>
            ${reservation.special_requests ? `
            <div class="detail-row">
              <span class="label">Special Requests</span>
              <span class="value">${reservation.special_requests}</span>
            </div>
            ` : ''}
          </div>

          <p style="text-align: center;">
            <a href="${getSiteUrl()}/admin/reservations" style="display: inline-block; background-color: #B91C1C; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">Review in Admin Panel</a>
          </p>
        </div>
        <div class="footer">
          <p>This is an automated notification from ${BUSINESS_NAME}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await resendClient.emails.send({
      from: getFromEmail(),
      to: adminEmail,
      subject: `New Reservation Request - ${reservation.name} - ${formatDate(reservation.rental_date)}`,
      html,
    });
    console.log('Admin notification email sent');
  } catch (error) {
    console.error('Failed to send admin notification email:', error);
    throw error;
  }
}

// Send confirmation email (to customer)
export async function sendConfirmationEmail(reservation: Reservation) {
  const resendClient = getResend();
  if (!resendClient) {
    console.log('Resend API key not configured, skipping email');
    return;
  }

  const price = getPriceForReservation(reservation.cart_type, reservation.time_slot);

  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>${getEmailStyles()}</style></head>
    <body>
      <div class="container">
        <div class="header" style="background-color: #059669;">
          <h1>Reservation CONFIRMED!</h1>
        </div>
        <div class="content">
          <h2>Great news, ${reservation.name}!</h2>
          <p>Your golf cart reservation has been confirmed. We look forward to seeing you!</p>

          <div class="details-box">
            <h3 style="margin-top: 0;">Confirmed Reservation</h3>
            <div class="detail-row">
              <span class="label">Date</span>
              <span class="value">${formatDate(reservation.rental_date)}</span>
            </div>
            <div class="detail-row">
              <span class="label">Time</span>
              <span class="value">${getTimeSlotLabel(reservation.time_slot)}</span>
            </div>
            <div class="detail-row">
              <span class="label">Cart</span>
              <span class="value">${getCartTypeLabel(reservation.cart_type)}</span>
            </div>
            <div class="detail-row">
              <span class="label">Price (Pay at Pickup)</span>
              <span class="price">${formatPrice(price)}</span>
            </div>
          </div>

          <div class="warning">
            <h4 style="margin-top: 0; color: #92400E;">Important Reminders</h4>
            <ul style="margin-bottom: 0; padding-left: 20px;">
              <li><strong>Please complete and bring your rental agreement</strong> with you to expedite the check-in process.</li>
              <li>Pick up your cart within <strong>1 hour</strong> of your scheduled time or your reservation will be cancelled.</li>
              <li><strong>No refunds</strong> - All sales are final. No exceptions.</li>
              <li>Payment is due at pickup. Parking lot is adjacent to rental pick-up.</li>
              <li>Carts are preassigned.</li>
              <li><strong>Wifi and cell service are limited during the show!</strong> Please save this email offline.</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 25px 0; padding: 20px; background-color: #F0FDF4; border: 1px solid #059669; border-radius: 8px;">
            <p style="margin: 0 0 15px 0; font-weight: 600;">Download, print, and bring your signed rental agreement:</p>
            <a href="${getSiteUrl()}/rental-agreement.pdf" class="btn" style="background-color: #059669;" target="_blank">Download Rental Agreement (PDF)</a>
          </div>

          <p>Questions? Text us at <strong>${CONTACT_INFO.phone}</strong></p>

          <p>See you soon!</p>
          <p><strong>${BUSINESS_NAME}</strong></p>
        </div>
        <div class="footer">
          <p>${BUSINESS_NAME} | ${BUSINESS_ADDRESS} | Round Top (Warrenton), Texas</p>
          <p>Phone: ${CONTACT_INFO.phone} (text preferred)</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await resendClient.emails.send({
      from: getFromEmail(),
      to: reservation.email,
      subject: `Reservation CONFIRMED - ${BUSINESS_NAME}`,
      html,
    });
    console.log('Confirmation email sent to customer');
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
    throw error;
  }
}

// Send SMS notification to admin via carrier email gateway
export async function sendAdminSmsNotification(reservation: Reservation) {
  const resendClient = getResend();
  const smsGateway = process.env.ADMIN_SMS_GATEWAY;

  if (!resendClient || !smsGateway) {
    console.log('Resend API key or SMS gateway not configured, skipping SMS');
    return;
  }

  const price = getPriceForReservation(reservation.cart_type, reservation.time_slot);

  // Keep message short for SMS
  const text = `New Reservation Request!
${reservation.name}
${reservation.phone}
${formatDate(reservation.rental_date)}
${getTimeSlotLabel(reservation.time_slot)}
${getCartTypeLabel(reservation.cart_type)}
${formatPrice(price)}`;

  try {
    await resendClient.emails.send({
      from: getFromEmail(),
      to: smsGateway,
      subject: 'New Reservation',
      text, // Plain text only for SMS
    });
    console.log('Admin SMS notification sent');
  } catch (error) {
    console.error('Failed to send admin SMS notification:', error);
    // Don't throw - SMS is non-critical
  }
}

// Send cancellation email (to customer when reservation is deleted)
export async function sendCancellationEmail(reservation: Reservation, reason?: string) {
  const resendClient = getResend();
  if (!resendClient) {
    console.log('Resend API key not configured, skipping email');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>${getEmailStyles()}</style></head>
    <body>
      <div class="container">
        <div class="header" style="background-color: #6B7280;">
          <h1>Reservation Cancelled</h1>
        </div>
        <div class="content">
          <p>Dear ${reservation.name},</p>
          <p>Your reservation has been cancelled:</p>

          <div class="details-box">
            <div class="detail-row">
              <span class="label">Date</span>
              <span class="value">${formatDate(reservation.rental_date)}</span>
            </div>
            <div class="detail-row">
              <span class="label">Time</span>
              <span class="value">${getTimeSlotLabel(reservation.time_slot)}</span>
            </div>
            <div class="detail-row">
              <span class="label">Cart</span>
              <span class="value">${getCartTypeLabel(reservation.cart_type)}</span>
            </div>
          </div>

          ${reason ? `
          <div class="details-box">
            <p style="margin: 0;"><strong>Note from our team:</strong></p>
            <p style="margin-bottom: 0;">${reason}</p>
          </div>
          ` : ''}

          <p>If you have any questions or would like to make a new reservation, please contact us.</p>

          <p>Text us at <strong>${CONTACT_INFO.phone}</strong></p>

          <p>Thank you for your interest in ${BUSINESS_NAME}.</p>
        </div>
        <div class="footer">
          <p>${BUSINESS_NAME} | ${BUSINESS_ADDRESS} | Round Top (Warrenton), Texas</p>
          <p>Phone: ${CONTACT_INFO.phone} (text preferred)</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await resendClient.emails.send({
      from: getFromEmail(),
      to: reservation.email,
      subject: `Reservation Cancelled - ${BUSINESS_NAME}`,
      html,
    });
    console.log('Cancellation email sent to customer');
  } catch (error) {
    console.error('Failed to send cancellation email:', error);
    throw error;
  }
}

// Send denial email (to customer)
export async function sendDenialEmail(reservation: Reservation, reason?: string) {
  const resendClient = getResend();
  if (!resendClient) {
    console.log('Resend API key not configured, skipping email');
    return;
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>${getEmailStyles()}</style></head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${BUSINESS_NAME}</h1>
        </div>
        <div class="content">
          <h2>Reservation Update</h2>
          <p>Dear ${reservation.name},</p>
          <p>Unfortunately, we are unable to confirm your reservation for:</p>

          <div class="details-box">
            <div class="detail-row">
              <span class="label">Date</span>
              <span class="value">${formatDate(reservation.rental_date)}</span>
            </div>
            <div class="detail-row">
              <span class="label">Time</span>
              <span class="value">${getTimeSlotLabel(reservation.time_slot)}</span>
            </div>
            <div class="detail-row">
              <span class="label">Cart</span>
              <span class="value">${getCartTypeLabel(reservation.cart_type)}</span>
            </div>
          </div>

          ${reason ? `
          <div class="details-box">
            <p style="margin: 0;"><strong>Note from our team:</strong></p>
            <p style="margin-bottom: 0;">${reason}</p>
          </div>
          ` : ''}

          <p>Please contact us to discuss alternative options or dates.</p>

          <p>Text us at <strong>${CONTACT_INFO.phone}</strong></p>

          <p>Thank you for your interest in ${BUSINESS_NAME}.</p>
        </div>
        <div class="footer">
          <p>${BUSINESS_NAME} | ${BUSINESS_ADDRESS} | Round Top (Warrenton), Texas</p>
          <p>Phone: ${CONTACT_INFO.phone} (text preferred)</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await resendClient.emails.send({
      from: getFromEmail(),
      to: reservation.email,
      subject: `Reservation Update - ${BUSINESS_NAME}`,
      html,
    });
    console.log('Denial email sent to customer');
  } catch (error) {
    console.error('Failed to send denial email:', error);
    throw error;
  }
}
