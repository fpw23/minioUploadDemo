import React from 'react'
// import moment from 'moment'
import { Table, message, Col, Row, Button } from 'antd'

class FileList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Items: [],
            Loading: true
        }
    }

    async LoadList() {
        const response = await fetch('/files/list')
        const body = await response.json()

        if (response.status !== 200) {
            message.error(body.message)
        }

        this.setState({
            Items: body.docs,
            Loading: false
        })
    }

    async componentDidMount() {
        await this.LoadList()
    }

    onClick (key) {
        window.alert(key)
    }

    render() {

        let columns = [
            {
                title: 'Name',
                dataIndex: 'Name',
                key: 'name',
            },
            {
                title: 'Size',
                dataIndex: 'Size',
                key: 'size',
            },
            {
                title: 'Actions',
                dataIndex: 'key',
                key: 'action',
                render: (text, record) => (
                  <span>
                    <a href={'http://localhost:5000/files/get/' + record.key}>View</a>
                  </span>
                ),
              }
        ]

        return (
            <div>
                <Row>
                    <Col span={8}>
                        <Button type="primary" onClick={() => { this.LoadList.call(this) }} loading={this.state.Loading}>
                            Reload
                        </Button>
                    </Col>
                </Row>

                <Table columns={columns} loading={this.state.Loading} dataSource={this.state.Items} rowKey='key' pagination={false} />
            </div>
        )

    }
}

export default FileList