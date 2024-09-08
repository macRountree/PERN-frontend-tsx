import {Outlet} from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header className="bg-cyan-700">
        <div className="mx-auto max-w-6xl py-10">
          <h1 className="text-4xl text-white font-extrabold">
            {' '}
            Product Management
          </h1>
        </div>
      </header>

      <main className="mt-10 mx-auto max-w-6xl p-10 bg-slate-50 shadow-lg rounded-lg">
        <Outlet />
      </main>
    </>
  );
};
