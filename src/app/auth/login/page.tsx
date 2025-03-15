import LoginForm from '../_component/LoginForm';
import SocialLogins from '../_component/SocialLogins';

export default async function LoginPage() {
  return (
    <div>
      <LoginForm />
      <SocialLogins authType="LOGIN" />
    </div>
  );
}
