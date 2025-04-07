//로그인
export async function PostSignIn(formData: FormData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signIn`, {
      method: 'POST',
      body: formData,
    });
    if (!response?.ok || response === null) {
      throw new Error('서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.');
    }
    if (response.status >= 400 && response.status < 500) {
      throw new Error('로그인하는데 실패하였습니다.');
    }
    // if (response.status >= 500) {
    //   throw new Error('서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.');
    // }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('알 수 없는 오류가 발생하였습니다.');
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}

//회원가입
export async function PostSignUp(formData: FormData) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signUp`, {
      method: 'POST',
      body: formData,
    });
    if (!response?.ok || response === null) {
      throw new Error('서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.');
    }
    if (response.status >= 400 && response.status < 500) {
      throw new Error('회원가입하는데 실패하였습니다.');
    }
    // if (response.status >= 500) {
    //   throw new Error('서버 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.');
    // }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('알 수 없는 오류가 발생하였습니다.');
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}
