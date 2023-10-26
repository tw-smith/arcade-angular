export class SignupFormEntry {
  constructor(
    public email: string,
    public username: string,
    public password: string,
    public repeatPassword: string
  ) {}
}

export class LoginFormEntry {
  constructor(
    public username: string,
    public password: string,
  ) {}
}

export class HighScoreFormEntry {
  constructor(
    public score_type: string,
    public value: number,
  ) {
  }
}

export class LobbyFormEntry {
  constructor(
    public name: string,
  ) {
  }
}

export class ForgottenPasswordFormEntry {
  constructor(
    public email: string,
  ) {
  }
}

export class ResetPasswordFormEntry {
  constructor(
    public newPassword: string,
    public repeatNewPassword: string
  ) {
  }
}
