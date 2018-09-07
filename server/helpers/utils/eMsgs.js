export default {
  verifiedMessage: `
    <div>
        <p>Hurry!!!!</p>
        <p>You have successfully verified your account, and
        we are supper exited to have you on our platform
        Thanks!
        </p>
    </div>`,
  msgOnRegistration(username, url, token) {
    return `
    <div>
        <h3>Hi ${username},</h3>
        <p>Welcome to Author's Haven, we extend our gratitude to
            to have you on our platform, But to activate your account please
            click on this link <br /> 
            <br /> <br /> 
            <a href="${url}/api/verify/${token}"
            style="border: 1px solid light-blue; background-color: blue; padding: 10px;
             color: #fff; border-radius:10px; text-decoration: none" > Verify Account
            <a>
        </p>
  </div>`;
  }
};
