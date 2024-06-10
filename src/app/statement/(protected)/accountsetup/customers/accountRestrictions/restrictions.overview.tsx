import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  EyeOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import styles from "./restrictions.overview.module.css";
import CustomTable, { DataFetcher } from "../../widgets/table/table";
import Search from "@/src/components/atoms/search/search";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import AddItem from "@/src/components/atoms/add-item/add.item";
import RemoveRestrictionModal from "@/src/app/statement/(protected)/accountsetup/page-manupilation/remove-from-page/restriction/remove.restriction";
import EditPageModal from "@/src/app/statement/(protected)/accountsetup/page-manupilation/edit-page/edit.page";
import CreateRestrictionModal from "../../page-manupilation/Add-in-page/createRestriction/create.restriction";
import { accountRestrictionsAction } from "@/src/lib/actions/accountRestrictions.actions";

interface DataType {
  id?: React.Key;
  createdOn?: string;
  userName?: string;
  role?: string;
  status?: string;
  icons?: React.ReactNode;
  currency?: string;
  accountId?: number;
  entryId?: number;
  userId?: string;
}

interface Datatype {
  title: string;
  dataIndex: keyof DataType;
  render?: (text: any, record: DataType) => React.ReactNode;
}

const RestrictionsOverview = (props: DataType) => {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [data, setData] = useState<DataFetcher[]>([]);
  const [dataId, setdataId] = useState<number | null>(null);

  useEffect(() => {
    const passedAccid = sessionStorage.getItem("passedaccountId");

    const fetchData = async () => {
      try {
        let incomingData = await accountRestrictionsAction(
          parseInt(passedAccid!)
        );

        setData(incomingData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleRemoveClick = (entryId: number) => {
    setdataId(entryId);
    setModalVisible2(true);
  };


  const columns: Datatype[] = [
    {
      title: "Name",
      dataIndex: "userName",
      render: (text) => <span className={styles.columnstyles}>{text}</span>,
    },
    {
      title: "Account ID",
      dataIndex: "id",
      render: (text) => <span className={styles.columnstyles}>{text}</span>,
    },
    {
      title: "Rules",
      dataIndex: "role",
      render: (text) => <span className={styles.columnstyles}>{text}</span>,
    },
    {
      title: "",
      dataIndex: "icons",
      render: (_text, record) => (
        <button className={styles.iconsdiv}>
          <div className={styles.icons}>
            <EyeOutlined key="eye" />
            <MinusOutlined
              key="minus"
              onClick={() => handleRemoveClick(record.entryId!)}
            />
          </div>
        </button>
      ),
    },
  ];

  const handleModalCancel1 = () => {
    setModalVisible1(false);
  };

  const handleModalCancel2 = () => {
    setModalVisible2(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <div className={styles.headerdiv}>
          <div className={styles.textdiv}>Restrictions</div>
          <div className={styles.atomsdiv}>
            <Search
              key="search"
              title={"Search..."}
              icon={<img src="/searchicon.svg" alt="searchicon" />}
            />
            <Filter
              key="filter"
              title={"Filter"}
              icon={<img src="/funnel.svg" alt="funnel" />}
            />
            <Sort
              key="sort"
              title={"Sort"}
              icon={<img src="/sort.svg" alt="sort" />}
            />
            <AddItem
              key="add"
              title={"Add Restriction"}
              icon={<PlusOutlined />}
              iconStyle={{ color: "gray" }}
              titleStyle={{ color: "gray" }}
              onClick={() => setModalVisible1(true)}
            />
          </div>
        </div>
        <CustomTable data={data} columns={columns} />
      </div>
      <CreateRestrictionModal
        visible={modalVisible1}
        onCancel={handleModalCancel1}
        customerId={props.accountId!}
      />
      <RemoveRestrictionModal
        visible={modalVisible2}
        onCancel={handleModalCancel2}
        restrictionId={dataId!}
      />
    </div>
  );
};

export default RestrictionsOverview;
