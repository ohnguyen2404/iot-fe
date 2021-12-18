import React, { useState, useEffect } from "react";
import { Divider, Form, Radio, Switch, Table, Button } from "antd";
import TenantService from "../../services/tenant";
import InfoTenantModal from "./InfoTenantModal";

const FormItem = Form.Item;

//const data = [
//  {
//    key: "1",
//    name: "John Brown",
//    age: 32,
//    address: "New York No. 1 Lake Park",
//    tags: ["nice", "developer"],
//  },
//];

const _title = () => "Here is title";
const _showHeader = true;
const _footer = () => "Here is footer";
const _scroll = { y: 240 };
const _pagination = { position: "bottom" };

const TableSelect = (props) => {
  const [bordered, setBordered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(_pagination);
  const [size, setSize] = useState("small");

  const [title, setTitle] = useState(undefined);
  const [showHeader, setShowHeader] = useState(true);
  const [rowSelection, setRowSelection] = useState({});
  const [footer, setFooter] = useState(_footer);
  const [scroll, setScroll] = useState(undefined);
  const [hasData, setHasData] = useState(true);
  const [tenants, setTenants] = useState([]);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [selectedTenantId, setSelectedTenantId] = useState(null)
  const state = {
    bordered,
    loading,
    pagination,
    size,
    showHeader,
    rowSelection,
    scroll,
    hasData,
  };

  useEffect(() => {
    const loadTenants = async () => {
      const tenants = await TenantService.getAll();
      setTenants(tenants);
    };
    loadTenants();
  }, []);

  const dataArray = tenants.map((tenant, index) => {
    return {
      key: index,
      id: tenant.id,
      email: tenant.email,
    };
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a href="javascript:">{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => {
            setSelectedTenantId(record.id)
            handleOpenModel(true)
          }}
          >Edit </Button>
          <Divider type="vertical" />
          <Button type="danger">Delete</Button>
        </span>
      ),
    },
  ];

  const handleToggle = (prop) => (enable) => {
    if (prop === "bordered") {
      setBordered(enable);
    }
    if (prop === "loading") {
      setLoading(enable);
    }
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleTitleChange = (enable) => {
    setTitle(enable ? _title : undefined);
  };

  const handleHeaderChange = (enable) => {
    setShowHeader(enable ? _showHeader : false);
  };

  const handleFooterChange = (enable) => {
    setFooter(enable ? _footer : undefined);
  };

  const handleRowSelectionChange = (enable) => {
    setRowSelection(enable ? {} : undefined);
  };

  const handleScollChange = (enable) => {
    setScroll(enable ? _scroll : undefined);
  };

  const handleDataChange = (hasData) => {
    setHasData(hasData);
  };

  const handlePaginationChange = (e) => {
    const { value } = e.target;
    setPagination(value === "none" ? false : { position: value });
  };

  const handleOpenModel = (value) => {
    setOpenInfoModal(value);
  };

  return (
    <div>
      <InfoTenantModal 
        tenantId={selectedTenantId}
        openTenantModal={openInfoModal}
        handleOpenModel={handleOpenModel}/>
      <div className="m-b-15">
        <Form layout="inline">
          <FormItem label="Bordered">
            <Switch
              checked={bordered}
              onChange={handleToggle("bordered")}
              size="small"
            />
          </FormItem>
          <FormItem label="loading">
            <Switch
              checked={loading}
              onChange={handleToggle("loading")}
              size="small"
            />
          </FormItem>
          <FormItem label="Title">
            <Switch
              checked={!!title}
              onChange={handleTitleChange}
              size="small"
            />
          </FormItem>
          <FormItem label="Column Header">
            <Switch
              checked={!!showHeader}
              onChange={handleHeaderChange}
              size="small"
            />
          </FormItem>
          <FormItem label="Footer">
            <Switch
              checked={!!footer}
              onChange={handleFooterChange}
              size="small"
            />
          </FormItem>
          <FormItem label="Checkbox">
            <Switch
              checked={!!rowSelection}
              onChange={handleRowSelectionChange}
              size="small"
            />
          </FormItem>
          <FormItem label="Fixed Header">
            <Switch
              checked={!!scroll}
              onChange={handleScollChange}
              size="small"
            />
          </FormItem>
          <FormItem label="Has Data">
            <Switch
              checked={!!hasData}
              onChange={handleDataChange}
              size="small"
            />
          </FormItem>
          <FormItem label="Size">
            <Radio.Group
              size="default"
              value={size}
              onChange={handleSizeChange}
              size="small"
            >
              <Radio.Button value="default" size="small">
                Default
              </Radio.Button>
              <Radio.Button value="middle" size="small">
                Middle
              </Radio.Button>
              <Radio.Button value="small" size="small">
                Small
              </Radio.Button>
            </Radio.Group>
          </FormItem>
          <FormItem label="Pagination" className="custom-float">
            <Radio.Group
              value={pagination ? pagination.position : "none"}
              onChange={handlePaginationChange}
              size="small"
            >
              <Radio.Button value="top" size="small">
                Top
              </Radio.Button>
              <Radio.Button value="bottom" size="small">
                Bottom
              </Radio.Button>
              <Radio.Button value="both" size="small">
                Both
              </Radio.Button>
              <Radio.Button value="none" size="small">
                None
              </Radio.Button>
            </Radio.Group>
          </FormItem>
        </Form>
      </div>
      <div className="custom-table">
        <Table
          {...state}
          columns={columns}
          dataSource={hasData ? dataArray : null}
          scroll={{ x: 768 }}
        />
      </div>
    </div>
  );
};

export default TableSelect;
