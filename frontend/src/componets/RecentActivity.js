import React from "react";
import { Card, Table } from "antd";


const columns = [
  {
    title: "Payment Subjet",
    dataIndex: "subject",
    key: "subject",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },

  {
    title: "Message",
    dataIndex: "message",
    key: "message",
  },
  {
    title: "Amount",
    key: "amount",
    render: (_, record) => (
      <div
        style={record.type === "Send" ? { color: "red" } : { color: "green" }}
      >
        {record.type === "Send" ? "-" : "+"}
        {record.amount} Matic
      </div>
    ),
  },
];

function RecentActivity({history}) {

  return (
    <Card title="Recent Activity" style={{ width: "100%", minHeight: "663px" }}>
      {history && 
      <Table
        dataSource={history}
        columns={columns}
        pagination={{ position: ["bottomCenter"], pageSize: 8 }}
      />
    }
    </Card>
  );
}

export default RecentActivity;
