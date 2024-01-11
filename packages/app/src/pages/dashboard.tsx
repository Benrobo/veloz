import { FlexColCenter } from "@/components/Flex";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import { DataContext } from "@/context/DataContext";
import withAuth from "@/lib/auth/withAuth";
import Image from "next/image";
import { useContext } from "react";

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
