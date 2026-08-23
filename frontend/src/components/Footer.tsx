function Footer() {
  return (
    <footer className="border-t border-[#9a3412]/10 bg-[#fffaf0]">
      <div className="mx-auto max-w-7xl px-4 py-10 text-center sm:px-6 lg:px-8">
        <div>
          <p className="text-lg font-bold text-[#4a1f1f]">
            Om Ganesh Sanskrutik Mandal
          </p>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#5c4a42]">
            Celebrating culture, community and traditions together.
          </p>
        </div>

        <div className="my-6 h-px bg-[#9a3412]/10" />

        <p className="text-sm text-[#5c4a42]">
          © {new Date().getFullYear()} Om Ganesh Sanskrutik Mandal. All rights
          reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer