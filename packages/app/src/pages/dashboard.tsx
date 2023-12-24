import { FlexColCenter } from "@/components/Flex";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import withAuth from "@/lib/auth/withAuth";
import Image from "next/image";

function Home() {
  return (
    <Layout activePage="home">
      <p className="text-white-100">Dashboard</p>
      <Modal isBlurBg isOpen fixed={false}>
        <FlexColCenter className="w-full h-full">
          <h1 className="text-white-100 text-3xl font-ppEB">Coming Soon</h1>
        </FlexColCenter>
      </Modal>
    </Layout>
  );
}
export default withAuth(Home);
