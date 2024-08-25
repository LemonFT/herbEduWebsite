// pages/register/layout.js
import Head from 'next/head';

export default function RegisterLayout(
    { children }: Readonly<{
        children: React.ReactNode
    }>
) {
    return (
        <>
            <Head>
                <title>Register with Herb Edu - Join Our Community Today</title>
                <meta name="description" content="Your Learning Journey with Herb Edu. Welcome Back to Herb Edu" />
                <meta name="keywords" content="Herb Edu, Register, Sign Up, Learning, Education, Login, Sign In, Access Account, Online Learning, Join Herb Edu" />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="canonical" href="https://www.herbedu.com/register" />
            </Head>

            <main>
                {children}
            </main>
        </>
    );
}
