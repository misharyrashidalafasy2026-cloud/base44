import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json();
    const { application_id, decision, organization_name, contact_email } = body;
    if (!application_id || !decision || !['approved', 'rejected'].includes(decision)) {
      return Response.json({ error: 'Invalid request' }, { status: 400 });
    }
    if (!contact_email) {
      return Response.json({ error: 'Contact email required' }, { status: 400 });
    }

    const isApproved = decision === 'approved';
    const subject = isApproved
      ? 'Welcome to Baitul-Ehsan Relief Fund Partners!'
      : 'Partner Application Update — Baitul-Ehsan Relief Fund';
    const text = isApproved
      ? `Dear ${organization_name},\n\nWe are pleased to inform you that your partner application has been approved. Welcome to the Baitul-Ehsan Relief Fund partner community!\n\nOur partnership team will be in touch shortly with next steps and MOU details.\n\nThank you for your commitment to making a lasting impact.\n\nBaitul-Ehsan Relief Fund`
      : `Dear ${organization_name},\n\nThank you for your interest in partnering with Baitul-Ehsan Relief Fund. After careful review, we are unable to approve your application at this time.\n\nYou are welcome to re-apply in the future. If you have any questions, please contact our team.\n\nBaitul-Ehsan Relief Fund`;

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: contact_email,
      subject,
      body: text,
    });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}