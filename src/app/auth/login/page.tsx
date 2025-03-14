import SocialLogins from '../_component/SocialLogins';

export default function LoginPage() {
  return (
    <>
      <section className="w-full">
        <form>
          [이메일]
          <br />
          [비밀번호]
        </form>
      </section>
      <SocialLogins authType="LOGIN" />
    </>
  );
}
