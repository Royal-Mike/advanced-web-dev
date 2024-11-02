import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import UserLogin from '../interface/UserLogin';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<UserLogin>();

  const onSubmit: SubmitHandler<UserLogin> = async data => {
    try {
			console.log("ha");
      const response = await fetch('https://advanced-web-nest-b24630e02d7a.herokuapp.com/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Allows cookies to be sent with the request
        body: JSON.stringify(data),
      });
			console.log("hey");
      if (response.ok) {
        const result = await response.json();
        console.log(result.access_token);
        // Optionally handle successful login (e.g., redirect, display message)
      }
      else {
				console.log("hi");
				const errorData = await response.json();
				console.error(errorData.message);
      }
    } catch (error) {
      console.error('An error occurred: ', error);
    }
  };

  return (
		<>
			<div className="flex flex-col p-6">
				<h3 className="text-xl font-semibold leading-6 tracking-tighter">Login</h3>
				<p className="mt-1.5 text-sm font-medium text-white/50">Welcome back, enter your credentials to continue.</p>
			</div>
			<div className="p-6 pt-0">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
						<div className="flex justify-between">
							<label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Username</label>
						</div>
						<input type="text" autoComplete="off" {...register('username', { required: 'Username is required' })}
							className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground" />
					</div>
					{errors.username && <p className="pt-2 text-red-600">{errors.username.message}</p>}
					<div className="mt-4 group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
						<div className="flex justify-between">
							<label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">Password</label>
						</div>
						<input type="password" {...register('password', { required: 'Password is required' })}
							className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 focus:ring-teal-500 sm:leading-7 text-foreground" />
					</div>
					{errors.password && <p className="pt-2 text-red-600">{errors.password.message}</p>}
					<div className="mt-4 flex items-center justify-between">
						<label className="flex items-center gap-2">
							<input type="checkbox" {...register('remember')}
								className="bg-transparent border-none text-transparent focus:ring-0 focus:ring-offset-0" />
							<span className="text-xs">Remember me</span>
						</label>
					</div>
					<div className="mt-4 flex items-center justify-end gap-x-2">
						<a className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:ring hover:ring-white h-10 px-4 py-2 duration-200"
							href="./register">Register</a>
						<button
							className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
							type="submit">Log in</button>
					</div>
				</form>
			</div>
		</>
  );
}

export default Login;
