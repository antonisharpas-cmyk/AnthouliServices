# Website email setup, Microsoft 365 (Outlook)

The website sends two kinds of message to **info@anthouli.com**: enquiries from the
Contact Us form and job applications from the Join Us form, the second one with the
CV attached. It sends them through the Microsoft Graph API using an application key,
which is Microsoft's current supported method. The older approach, an app password
over SMTP, is being switched off by Microsoft, so we are not using it.

Everything below is done once, by someone who is a **Global Administrator** of the
C. Anthouli Microsoft 365 tenant. It takes about ten minutes.

---

## Step 1. Create the app registration

1. Go to https://entra.microsoft.com and sign in with the admin account.
2. In the left menu choose **Applications**, then **App registrations**.
3. Click **New registration**.
4. Name it `C. Anthouli Website Mailer`.
5. Under supported account types leave the default, **Accounts in this organizational
   directory only**.
6. Leave Redirect URI empty.
7. Click **Register**.

On the Overview page that opens, copy and keep these two values:

* **Application (client) ID**
* **Directory (tenant) ID**

Neither of these is secret.

---

## Step 2. Give it permission to send mail

1. Still inside the app, open **API permissions** in the left menu.
2. Click **Add a permission**, then **Microsoft Graph**.
3. Choose **Application permissions**, not Delegated.
4. Search for `Mail.Send`, tick it, then click **Add permissions**.
5. Back on the API permissions page click **Grant admin consent for C. Anthouli Ltd**
   and confirm. The status column must turn green.

Remove any other permission that is listed, including `User.Read`, so the app can do
nothing except send mail.

---

## Step 3. Create the key

1. Open **Certificates & secrets** in the left menu.
2. Under **Client secrets** click **New client secret**.
3. Description: `Website mailer`. Expiry: choose **24 months**.
4. Click **Add**.
5. The **Value** column now shows the key. Copy it immediately. It is shown only once
   and cannot be retrieved afterwards. If it is lost, delete the secret and make a new one.

Write down the expiry date. The website will stop sending mail on that date unless a
new secret is created and the server updated, so put a reminder in the calendar about
a month beforehand.

---

## Step 4. Restrict the key to the one mailbox (important)

By default the `Mail.Send` permission lets the app send as **any** mailbox in the
tenant. Lock it down to info@anthouli.com only.

In the Microsoft 365 admin centre go to **Settings**, **Integrated apps**, then
**Resource scoping** or, in Exchange admin centre, **Roles**, **Admin roles**,
**Add role assignment** for applications. Create a resource scope containing only
the info@anthouli.com mailbox and assign the **Application Mail.Send** role to the
app registration created above, scoped to that group.

If that section is not available in the tenant, the older PowerShell equivalent still
works:

```powershell
Connect-ExchangeOnline
New-ApplicationAccessPolicy -AppId <Application (client) ID> `
  -PolicyScopeGroupId info@anthouli.com `
  -AccessRight RestrictAccess `
  -Description "Website mailer, info mailbox only"
```

---

## Step 5. What to send us

Send these three values:

| Value | Where it came from |
|---|---|
| Directory (tenant) ID | Step 1 |
| Application (client) ID | Step 1 |
| Client secret value | Step 3 |

Please do **not** email the client secret together with the other two, and do not put
it in a ticket or a chat message that stays on record. Send the tenant ID and client
ID by email, and pass the secret separately, by phone or through a one time secret
link such as https://onetimesecret.com. Once it is installed on the server, delete
your copy.

---

## Step 6. Where it goes on the server

In the `.env` file next to `server.js`:

```
MAIL_TO=info@anthouli.com
MAIL_SENDER=info@anthouli.com
GRAPH_TENANT_ID=<Directory (tenant) ID>
GRAPH_CLIENT_ID=<Application (client) ID>
GRAPH_CLIENT_SECRET=<the secret value>
```

Then restart the site with `npm start`. The `.env` file must never be committed to
version control and must not sit inside the public folder.

---

## Testing it

Submit the Contact Us form on the live site with a real address. The message should
arrive at info@anthouli.com within a few seconds, with the sender's address set as
the reply to, so replying goes straight back to them. Then submit the Join Us form
with a small PDF to confirm the attachment arrives.

If nothing arrives, the server log prints the exact reason. The two common ones are
`invalid_client`, which means the secret was copied from the wrong column or has
expired, and `ErrorAccessDenied`, which means admin consent in step 2 was not granted
or the scoping in step 4 excludes the mailbox.
