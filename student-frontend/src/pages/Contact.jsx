import Actionbtn from "../components/Actionbtn";

function Contact() {

    function handleSubmit(){
        alert("Form Submitted successfully!")
    }
    return (
        <section className="min-h-screen bg-white px-4 py-16">
            <div className="mx-auto max-w-2xl">

                <div className="mb-10">
                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
                        Get in touch
                    </h1>

                    <p className="mt-3 text-gray-500">
                        Have a question? Fill out the form below and we'll get back to you.
                    </p>
                </div>

                <div className="mb-8 space-y-2 text-sm text-gray-600">
                    <p>
                        <span className="font-medium text-gray-900">Email:</span>{" "}
                        [EMAIL_ADDRESS]
                    </p>

                    <p>
                        <span className="font-medium text-gray-900">Phone:</span>{" "}
                        +1234567890
                    </p>
                </div>

                <form action="" method="POST" className="space-y-6">

                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your name"
                            required
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="you@example.com"
                            required
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Message
                        </label>

                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            placeholder="How can I help you?"
                            required
                            className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-100"
                        />
                    </div>

                    <Actionbtn text="Send Message" onclick={handleSubmit} />

                </form>
            </div>
        </section>
    );
}

export default Contact;