"use client";

const MainContentsOfContactUs = () => {
  return (
    <div className="my-20   p-5" id="contact">
      <h1 className="text-center text-6xl font-bold mt-10">
        Contact <span className="text-[#e69f42]">Us</span>
      </h1>

      <div className="flex flex-wrap justify-center items-center mt-10">
        <div className="contact-image flex-1 min-w-[300px] p-5">
          <img
            alt="Profile"
            className="w-full rounded-lg shadow-2xl"
            src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </div>
        <div className="contact-form flex-1 min-w-[300px] p-5">
          <form className="space-y-4">
            <input
              className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              name="name"
              placeholder="Your Name"
              type="text"
            />
            <input
              className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              name="email"
              placeholder="E-mail"
              type="email"
            />
            <textarea
              className="w-full p-3 h-32 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              name="message"
              placeholder="Your Message"
            />
            <input
              className="w-full p-3 bg-[#e69f42] text-white rounded-md hover:bg-white hover:text-black transition duration-200"
              type="submit"
              value="Send"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainContentsOfContactUs;
