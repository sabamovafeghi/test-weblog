// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import "../styles/globals.css";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();


    if (username === 'testuser' && password === 'password') {
      const token = 'test-token';
      Cookies.set('token', token, { expires: 7 });
      router.push('/blog');
    } else {
      alert('Invalid credentials'); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
      class="absolute rounded-3xl inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 -rotate-6 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
    </div>
    <div class="relative px-4 py-10 rounded-3xl bg-white shadow-lg sm:rounded-3xl sm:p-20">
    <div class="max-w-md mx-auto">
        <div> 
        <h2 class="text-xl font-semibold rtl:ml-0 rtl" dir='rtl'>ورود|خوش آمدید!</h2> 
        </div>
        <form class="divide-y divide-gray-200" onSubmit={handleLogin}>
          <div class="py-8 text-base leading-6 space-y-5 text-gray-700 sm:text-lg sm:leading-7">
            <div class="relative">
              <input   value={username}
              onChange={(e) => setUsername(e.target.value)} autocomplete="off" id="username" name="username" type="text" class="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
              <label for="username" class="absolute right-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-1 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm" dir='rtl'>نام کاربری</label>
            </div>
            <div class="relative">
              <input  value={password} 
              onChange={(e) => setPassword(e.target.value)} autocomplete="off" id="password" name="password" type="password" class="peer placeholder-transparent h-12 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
              <label for="password" class="absolute right-0 -top-4.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-1 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">رمز عبور</label>
            </div>
            <div class="relative">
              <button class="bg-cyan-500 text-white rounded-md px-2 py-1 w-full">ورود</button>
            </div>
          </div>
        </form>
    </div>
        </div>

      </div> 
    </div>
  );
};

export default Login;
