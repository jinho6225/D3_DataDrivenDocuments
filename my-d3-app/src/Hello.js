import React, { Component } from "react";
import Dropzone from "react-dropzone";
const csv = require("csvtojson");

export default class Hello extends Component {
  state = {
    files: [],
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({
      files: acceptedFiles,
    });

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const fileAsBinaryString = reader.result;

        csv({
          noheader: true,
          output: "json",
        })
          .fromString(fileAsBinaryString)
          .then((csvRows) => {
            const toJson = [];
            csvRows.forEach((aCsvRow, i) => {
              if (i !== 0) {
                const builtObject = {};

                Object.keys(aCsvRow).forEach((aKey) => {
                  const valueToAddInBuiltObject = aCsvRow[aKey];
                  const keyToAddInBuiltObject = csvRows[0][aKey];
                  builtObject[keyToAddInBuiltObject] = valueToAddInBuiltObject;
                });

                toJson.push(builtObject);
              }
            });
            this.props.onDrop(toJson);
          });
      };

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.readAsBinaryString(file);
    });
  };

  render() {
    return (
      <header>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)} multiple={false}>
            <p>
              Try dropping some files here, or click to select files to upload.
            </p>
          </Dropzone>
        </div>
        <aside>
          <ul>
            {this.state.files.map((f) => (
              <li key={f.name}>
                {f.name} - {f.size} bytes
              </li>
            ))}
          </ul>
        </aside>
      </header>
    );
  }
}
