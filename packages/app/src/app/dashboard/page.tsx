"use client";
import { FlexColCenter } from "@/components/Flex";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import withAuth from "@/lib/auth/withAuth";

function Home() {
  return (
    <Layout activePage="home">
      <Modal isBlurBg isOpen fixed={false}>
        <FlexColCenter className="w-full h-full">
          <h1 className="text-white-100 text-1xl md:text-3xl font-ppEB">
            Coming Soon
          </h1>
        </FlexColCenter>
      </Modal>
    </Layout>
  );
}
export default withAuth(Home);
