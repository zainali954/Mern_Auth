export const verifyEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            color: #333;
            line-height: 1.6;
            transition: background-color 0.3s, color 0.3s;
        }

        @media (prefers-color-scheme: dark) {
            body {
                background-color: #1e1e2d;
                color: #ccc;
            }
        }

        .email-container {
            max-width: 600px;
            margin: 50px auto;
            background: #fff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s;
        }

        @media (prefers-color-scheme: dark) {
            .email-container {
                background: #2e2e3e;
            }
        }

        .header {
            background: #4cafef;
            color: #fff;
            padding: 20px;
            text-align: center;
            font-size: 1.5rem;
            font-weight: bold;
        }

        .content {
            padding: 30px;
        }

        .content p {
            margin: 0 0 15px;
        }

        .button-container {
            text-align: center;
            margin: 20px 0;
        }

        .verify-button {
            display: inline-block;
            padding: 15px 30px;
            font-size: 1rem;
            color: #fff;
            background: #4cafef;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            cursor: pointer;
            transition: background 0.3s;
        }

        .verify-button:hover {
            background: #3b9edb;
        }

        .link-container {
            margin-top: 20px;
            text-align: center;
            font-size: 0.9rem;
            word-wrap: break-word;
        }

        .footer {
            background: #f4f4f9;
            padding: 15px;
            text-align: center;
            font-size: 0.8rem;
            color: #777;
        }

        @media (prefers-color-scheme: dark) {
            .footer {
                background: #1e1e2d;
                color: #999;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            Verify Your Email
        </div>
        <div class="content">
            <p>Hi there,</p>
            <p>You're almost there! Please click the button below to verify your email address. This link will expire in <strong>1 hour</strong>.</p>
            <div class="button-container">
                <a href="{{verification_link}}" class="verify-button">Verify Email</a>
            </div>
            <p>If the button above doesn’t work, you can copy and paste the link below into your browser:</p>
            <div class="link-container">
                <a href="{{verification_link}}" style="color: #4cafef;">{{verification_link}}</a>
            </div>
        </div>
        <div class="footer">
            If you didn’t request this email, you can safely ignore it.
        </div>
    </div>
</body>
</html>

`

export const emailVerifiedSuccessfully = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verified</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #4CAF50;
            color: #fff;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content h1 {
            color: #4CAF50;
            font-size: 24px;
            margin-bottom: 20px;
        }
        .footer {
            background-color: #f4f4f4;
            color: #777;
            text-align: center;
            padding: 10px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Your Email is Verified!</h1>
        </div>
        <div class="content">
            <h1>Thank You!</h1>
            <p>Your email has been successfully verified. You can now enjoy full access to our services.</p>
            <p>If you have any questions, feel free to contact our support team.</p>
        </div>
        <div class="footer">
            &copy; 2024 Authify. All rights reserved.
        </div>
    </div>
</body>
</html>

`

export const passwordResetTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #007bff;
            color: #fff;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content h1 {
            color: #007bff;
            font-size: 24px;
            margin-bottom: 20px;
        }
        .content p {
            font-size: 16px;
            margin-bottom: 20px;
        }
        .reset-button {
            display: inline-block;
            padding: 12px 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #007bff;
            border-radius: 5px;
            text-decoration: none;
        }
        .footer {
            background-color: #f4f4f4;
            color: #777;
            text-align: center;
            padding: 10px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <h1>Reset Your Password</h1>
            <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
            <p>To reset your password, click the button below:</p>
            <a href="{{RESET_URL}}" class="reset-button">Reset Password</a>
            <p>If the button doesn't work, copy and paste the following link into your browser:</p>
            <p><a href="{{RESET_URL}}" target="_blank">{{RESET_URL}}</a></p>
        </div>
        <div class="footer">
            &copy; 2024 Authify. All rights reserved.
        </div>
    </div>
</body>
</html>

`