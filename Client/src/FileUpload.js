import React from 'react' 
import { Upload, message, Button, Icon } from 'antd'

class FileUpload extends React.Component {

    render () {

        const props = {
            name: 'newFile',
            action: '/files/add',
            showUploadList: false,
            onChange(info) {
              if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
              }
              if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
              } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },
          };
          
          return (
            <Upload {...props}>
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
          )
    }

}

export default FileUpload