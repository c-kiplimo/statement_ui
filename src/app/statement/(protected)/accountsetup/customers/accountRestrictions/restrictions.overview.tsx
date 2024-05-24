"use client";
import React, { useEffect, useState } from "react";
import { EditOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
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

interface DataTypesProps {
  id?: React.Key;
  entryId?: number;
  userName?: string;
  description?: string;
  icons?: React.ReactNode;
}

interface Datatype {
  title: string;
  dataIndex: keyof DataTypesProps;
  render?: (text: string, record: DataTypesProps) => React.ReactNode;
}

const RestrictionsOverview = ({ entryId }: DataTypesProps) => {
  const [modalState, setModalState] = useState({
    create: false,
    remove: false,
    edit: false,
  });
  const [data, setData] = useState<DataFetcher[]>([]);
  const [dataId, setDataId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (entryId !== undefined) {
      const fetchData = async () => {
        try {
          console.log("Fetching data for entryId:", entryId);
          const incomingTableData = await accountRestrictionsAction(entryId);
          setData(incomingTableData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Error fetching data");
          setLoading(false);
        }
      };
      fetchData();
    } else {
      console.warn("entryId is undefined. Skipping data fetch.");
      setLoading(false);
      setError("Invalid entry ID provided.");
    }
  }, [entryId]);

  const handleRemoveClick = (entryId: number) => {
    setDataId(entryId);
    setModalState((prev) => ({ ...prev, remove: true }));
  };

  const handleEditClick = (entryId: number) => {
    setDataId(entryId);
    setModalState((prev) => ({ ...prev, edit: true }));
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
    },
    {
      title: "Rule",
      dataIndex: "description",
      render: (text) => <span className={styles.columnstyles}>{text}</span>,
    },
    {
      title: "",
      dataIndex: "icons",
      render: (_text, record) => (
        <div className={styles.icons}>
          <MinusOutlined onClick={() => handleRemoveClick(record.entryId!)} />
          <EditOutlined onClick={() => handleEditClick(record.entryId!)} />
        </div>
      ),
    },
  ];

  const handleModalCancel = (modalType: keyof typeof modalState) => {
    setModalState((prev) => ({ ...prev, [modalType]: false }));
    if (modalType !== "create") setDataId(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <div className={styles.headerdiv}>
          <div className={styles.textdiv}>Restrictions</div>
          <div className={styles.atomsdiv}>
            <Search
              key="search"
              title="Search..."
              icon={<img src="/searchicon.svg" alt="searchicon" />}
            />
            <Filter
              key="filter"
              title="Filter"
              icon={<img src="/funnel.svg" alt="funnel" />}
            />
            <Sort
              key="sort"
              title="Sort"
              icon={<img src="/sort.svg" alt="sort" />}
            />
            <AddItem
              key="add"
              title="Add Restriction"
              icon={<PlusOutlined />}
              iconStyle={{ color: "gray" }}
              titleStyle={{ color: "gray" }}
              onClick={() => setModalState((prev) => ({ ...prev, create: true }))}
            />
          </div>
        </div>
        <CustomTable data={data} columns={columns} />
      </div>
      <CreateRestrictionModal
        visible={modalState.create}
        onCancel={() => handleModalCancel("create")}
        customerId={dataId!}
      />
      <RemoveRestrictionModal
        visible={modalState.remove}
        onCancel={() => handleModalCancel("remove")}
        restrictionId={dataId !== null ? dataId : 0}
      />
      <EditPageModal
        visible={modalState.edit}
        onCancel={() => handleModalCancel("edit")}
        restrictionId={dataId !== null ? dataId : 0}
      />
    </div>
  );
};

export default RestrictionsOverview;
