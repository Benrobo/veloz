export default function Footer() {
  return (
    <div className="w-full bg-dark-200 py-5 px-5">
      <p className="font-ppReg text-sm text-white-100/50">
        © Veloz {new Date().getFullYear()}
      </p>
    </div>
  );
}
