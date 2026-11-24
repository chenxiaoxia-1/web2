<template>
  <div class="jobDetailsDiv" @click="jobDetailsClick">
    <div class="bgView">
      <div class="title1">{{ jobDetailData.name }}</div>
      <div class="title2">
        {{
          jobDetailData.jobPlaces?.map((item) => item.jobPlaceName).join("、")
        }}丨{{ jobDetailData.jobCategory }}丨{{ jobDetailData.number }}位
      </div>
      <div class="title3">工作职责</div>
      <div class="title4" v-html="jobDetailData.responsibility"></div>
      <div class="title3">任职要求</div>
      <div class="title4" v-html="jobDetailData.requirement"></div>
      <el-button class="deliverBtn" @click="deliverBtnAction"
        >立即投递</el-button
      >
    </div>
    <div class="buttomDiv">
      网站信息：互联网药品医疗器械信息服务备案凭证 备案编号:
      苏网药械信备字【2026】000072号
    </div>
    <el-dialog
      title="正在申请:"
      :center="true"
      class="dialogDiv"
      top="5vh"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="title1">{{ jobDetailData.name }}</div>
      <div class="uploadDiv" v-if="!$root.isMobile">
        <el-upload
          class="upload-demo"
          drag
          accept=".jpg,.pdf,.doc,.docx"
          action="#"
          :on-change="uploadChange1"
          :file-list="fileList"
          :show-file-list="true"
          :limit="1"
          :on-remove="deleteFile"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将简历拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            最大20MB，.jpg、.doc、.docx或.pdf格式
          </div>
        </el-upload>
      </div>
      <div class="titleDiv">基本信息:</div>
      <div class="basicInfoDiv">
        <div class="basicTitle">姓名<span class="basicTitle2">*</span></div>
        <el-input
          class="nameInput"
          v-model="jobSeeker.name"
          placeholder="请输入姓名"
        ></el-input>
        <div class="basicTitle">性别<span class="basicTitle2">*</span></div>
        <el-radio v-model="jobSeeker.gender" label="1">男</el-radio>
        <el-radio v-model="jobSeeker.gender" label="0">女</el-radio>
        <div class="basicTitle">手机号<span class="basicTitle2">*</span></div>
        <el-input
          placeholder="请输入手机号"
          v-model="jobSeeker.phone"
          class="input-with-select"
        >
          <el-select
            v-model="jobSeeker.diallingCode"
            slot="prepend"
            clearable
            placeholder="请选择"
          >
            <el-option label="+86" value="1"></el-option>
          </el-select>
        </el-input>
      </div>
      <div class="titleDiv">工作经历:</div>
      <div class="workExperienceDiv">
        <el-checkbox
          class="checkBoxDiv"
          @change="workExperienceChange"
          v-model="workExperience"
          >无工作经历</el-checkbox
        >
        <div
          v-show="!workExperience"
          class="itemDiv"
          v-for="(item, index) in jobSeeker.jobResumeList"
          :key="index"
        >
          <div class="workExperienceTitle">
            公司名称{{ index + 1 }}<span class="workExperienceTitle2">*</span>
          </div>
          <el-input
            class="nameInput"
            v-model="item.corporateName"
            placeholder="请输入公司名称"
          ></el-input>
          <div class="workExperienceTitle">
            工作职位<span class="workExperienceTitle2">*</span>
          </div>
          <el-input
            class="nameInput"
            v-model="item.position"
            placeholder="请输入工作岗位"
          ></el-input>
          <div class="workExperienceTitle">
            起止时间<span class="workExperienceTitle2">*</span>
          </div>
          <el-date-picker
            class="workExperienceDatePicker"
            v-model="item.dateValue[0]"
            :clearable="false"
            :size="$root.isMobile ? 'mini' : ''"
            value-format="yyyy-MM"
            placeholder="开始时间"
          >
          </el-date-picker>
          <span class="separator">→</span>
          <el-date-picker
            class="workExperienceDatePicker"
            v-model="item.dateValue[1]"
            popper-class="DatePickerPopper"
            :clearable="false"
            :size="$root.isMobile ? 'mini' : ''"
            value-format="yyyy-MM-dd"
            align="center"
            :picker-options="pickerOptions"
            placeholder="结束时间"
          >
          </el-date-picker>
        </div>
        <div
          v-show="!workExperience"
          class="addWorkExperienceBtn"
          @click="addWorkExperienceBtnAction"
        >
          +添加工作经历
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="confirmBtn" type="primary" @click="confirmBtnAction"
          >确认申请</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getJobById, addJobSeeker } from "@/api/serviceApi";
import $bus from "../components/eventBus";

export default {
  name: "jobDetails",
  data() {
    return {
      jobDetailData: {},
      dialogVisible: false,
      fileList: [],
      fileBase64: "",
      jobSeeker: {
        diallingCode: "1", //手机号归属国家的区号
        gender: "", //性别：女0  男1
        name: "",
        phone: "",
        jobResumeList: [
          {
            corporateName: "",
            startTime: "",
            endTime: "",
            position: "",
            dateValue: [],
          },
        ],
      },
      workExperience: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "至今",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
        ],
      },
    };
  },
  created() {
    let id = sessionStorage.getItem("pageId");
    this.getJobDetail(id);
  },
  mounted() {},
  methods: {
    jobDetailsClick() {
      $bus.$emit("menuRecover", "1");
    },
    getJobDetail(id) {
      getJobById(id).then((res) => {
        if (res.status == 200) {
          this.jobDetailData = res.data;
        }
      });
    },
    deliverBtnAction() {
      this.dialogVisible = true;
      this.fileList = [];
      this.fileBase64 = "";
      this.jobSeeker = {
        diallingCode: "1", //手机号归属国家的区号
        gender: "", //性别：女0  男1
        name: "",
        phone: "",
        jobResumeList: [
          {
            corporateName: "",
            startTime: "",
            endTime: "",
            position: "",
            dateValue: [],
          },
        ],
      };
      this.workExperience = false;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    uploadChange1(file, fileList) {
      // 参数安全检查
      if (!file) {
        console.error("uploadChange1: file参数为空");
        return false;
      }

      // 检查文件大小
      if (!file.size) {
        this.$message.error("文件大小异常");
        return false;
      }

      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        this.$message.error("上传文件大小不能超过20MB!");
        // 从显示列表中移除
        this.fileList = fileList.filter((item) => item.uid !== file.uid);
        return false;
      }

      // 更新fileList显示（只显示最后一个文件）
      this.fileList = [file];

      // 获取要读取的文件对象
      let fileToRead;
      if (file.raw) {
        // element-ui的file对象
        fileToRead = file.raw;
      } else if (file instanceof File) {
        // 直接的File对象
        fileToRead = file;
      } else {
        console.error("无法识别的文件对象:", file);
        this.$message.error("文件格式错误");
        this.fileList = [];
        return false;
      }

      // 读取文件
      const reader = new FileReader();

      reader.onload = () => {
        try {
          const result = reader.result;
          if (typeof result === "string" && result.startsWith("data:")) {
            // 提取base64部分
            const base64Start = result.indexOf("base64,");
            if (base64Start !== -1) {
              this.fileBase64 = result.substring(base64Start + 7);
            } else {
              // 如果没有base64前缀，尝试直接使用
              this.fileBase64 = result;
            }
          } else {
            this.fileBase64 = result;
          }
        } catch (error) {
          console.error("文件处理错误:", error);
          this.$message.error("文件处理失败");
          this.fileList = [];
          this.fileBase64 = "";
        }
      };

      reader.onerror = (error) => {
        console.error("文件读取错误:", error);
        this.$message.error("文件读取失败");
        this.fileList = [];
        this.fileBase64 = "";
      };

      reader.readAsDataURL(fileToRead);

      return true;
    },
    deleteFile() {
      this.fileList = [];
      this.fileBase64 = "";
    },
    workExperienceChange(val) {
      if (val) {
        this.jobSeeker.jobResumeList = [];
      } else {
        this.jobSeeker.jobResumeList = [
          {
            corporateName: "",
            startTime: "",
            endTime: "",
            position: "",
            dateValue: [],
          },
        ];
      }
    },
    addWorkExperienceBtnAction() {
      this.jobSeeker.jobResumeList.push({
        corporateName: "",
        startTime: "",
        endTime: "",
        position: "",
        dateValue: [],
      });
    },
    confirmBtnAction() {
      if (this.jobSeeker.name.length == 0) {
        this.$message({
          showClose: true,
          message: "姓名不能为空！",
          type: "error",
        });
        return;
      }
      if (this.jobSeeker.gender.length == 0) {
        this.$message({
          showClose: true,
          message: "性别不能为空！",
          type: "error",
        });
        return;
      }
      if (this.jobSeeker.phone.length == 0) {
        this.$message({
          showClose: true,
          message: "手机号不能为空！",
          type: "error",
        });
        return;
      }
      if (this.fileList.length == 0 && this.fileBase64?.length === 0) {
        this.$message({
          showClose: true,
          message: "请上传简历！",
          type: "error",
        });
        return;
      }
      if (this.jobSeeker.jobResumeList.length > 0) {
        var a = true;
        for (let i = 0; i < this.jobSeeker.jobResumeList.length; i++) {
          const element = this.jobSeeker.jobResumeList[i];
          if (
            element.corporateName.length == 0 ||
            element.position.length == 0 ||
            element.dateValue.length == 0
          ) {
            a = false;
            break;
          }
        }
        if (!a) {
          this.$message({
            showClose: true,
            message: "请填写完整的工作经历！",
            type: "error",
          });
          return;
        }
      }
      for (let i = 0; i < this.jobSeeker.jobResumeList.length; i++) {
        const element = this.jobSeeker.jobResumeList[i];
        element.startTime = element.dateValue[0];
        element.endTime = element.dateValue[1];
      }
      var resumeFileName = this.fileList[0].name;
      var params = {
        resumeFileBase64: this.fileBase64,
        resumeFileName: resumeFileName,
        name: this.jobSeeker.name,
        gender: this.jobSeeker.gender,
        phone: this.jobSeeker.phone,
        diallingCode: this.jobSeeker.diallingCode,
        jobResumeList: this.jobSeeker.jobResumeList,
        jobId: this.jobDetailData.id,
      };

      addJobSeeker(params).then((res) => {
        if (res.status == 200) {
          this.$message({
            showClose: true,
            message: "投递成功！",
            type: "success",
          });
          this.dialogVisible = false;
        }
      });
    },
  },
  beforeDestroy() {},
};
</script>

<style scoped lang="less">
.jobDetailsDiv {
  width: 100%;
  background: #001b33;
  padding-top: 110px;

  .bgView {
    max-width: 1180px;
    min-width: 335px;
    width: 89vw;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    margin-left: auto;
    margin-right: auto;
    padding: 60px;

    .title1 {
      font-size: 36px;
      font-family: SourceHanSansCN-Bold;
      color: #ffffff;
      line-height: 54px;
    }

    .title2 {
      margin-top: 10px;
      font-size: 20px;
      font-family: SourceHanSansCN-Light;
      color: #ffffff;
      line-height: 30px;
    }

    .title3 {
      margin-top: 40px;
      font-size: 24px;
      font-family: SourceHanSansCN-Bold;
      color: #ffffff;
      line-height: 36px;
    }

    .title4 {
      margin-top: 10px;
      font-size: 16px;
      font-family: SourceHanSansCN-Light;
      color: #ffffff;
      line-height: 40px;
    }

    .deliverBtn {
      margin-top: 60px;
      width: 190px;
      height: 48px;
      background: #005bac;
      border-radius: 4px;
      font-size: 20px;
      font-family: SourceHanSansCN-Light;
      color: #f4faff;
      border: none;
      box-shadow: none;
    }

    .deliverBtn:hover {
      transform: translate(0px, 0px);
      transition: transform 0.2s;
      background-color: rgba(0, 97, 172, 0.8);
    }
  }

  .buttomDiv {
    margin-top: 200px;
    padding-bottom: 100px;
    text-align: center;
    font-size: 15px;
    font-family: SourceHanSansCN-Light;
    color: #bebebe;
    line-height: 23px;
  }

  .dialogDiv {
    /deep/ .el-dialog {
      max-width: 1080px;
      width: 73vw;
      min-width: 335px;
    }

    .title1 {
      text-align: center;
      font-size: 36px;
      font-family: SourceHanSansCN-Bold;
      color: #333333;
      line-height: 54px;
    }

    .uploadDiv {
      background-color: #f4f4f4;
      text-align: center;
      padding-bottom: 30px;
      padding-top: 30px;

      .upload-demo {
        margin-left: auto;
        margin-right: auto;
      }

      .uploadBottomDiv {
        margin-top: 10px;
        text-align: center;
        font-size: 14px;
        font-family: SourceHanSansCN-Light;

        color: #666666;
        line-height: 21px;
      }
    }

    .titleDiv {
      margin-top: 35px;
      font-size: 20px;
      font-family: SourceHanSansCN-Bold;
      color: #333333;
      line-height: 30px;
    }

    .basicInfoDiv {
      width: 580px;
      margin-left: auto;
      margin-right: auto;

      .basicTitle {
        margin-top: 20px;
        margin-bottom: 20px;
        font-size: 20px;
        font-family: SourceHanSansCN-Light;
        color: #333333;
        line-height: 30px;

        .basicTitle2 {
          color: #ff4545;
        }
      }

      .nameInput {
        width: 580px;
      }
    }

    .workExperienceDiv {
      width: 580px;
      margin-left: auto;
      margin-right: auto;

      .checkBoxDiv {
        margin-top: 20px;
        font-family: SourceHanSansCN-Light;
        color: #999999;
        line-height: 30px;
      }

      .itemDiv {
        width: 580px;

        .workExperienceTitle {
          margin-top: 20px;
          margin-bottom: 20px;
          font-size: 20px;
          font-family: SourceHanSansCN-Light;
          color: #333333;
          line-height: 30px;

          .workExperienceTitle2 {
            color: #ff4545;
          }
        }

        .workExperienceDatePicker {
          width: 280px;
        }

        .separator {
          display: inline-block;
          width: 20px;
          text-align: center;
        }
      }

      .addWorkExperienceBtn {
        margin-top: 20px;
        font-size: 20px;
        cursor: pointer;
        font-family: SourceHanSansCN-Light;
        color: #005bac;
        line-height: 30px;
      }
    }

    .dialog-footer {
      .confirmBtn {
        width: 190px;
        height: 48px;
        margin-bottom: 80px;
        background: #005bac;
        border-radius: 4px;
        font-size: 20px;
        font-family: SourceHanSansCN-Light;
        color: #f4faff;
        border: none;
        box-shadow: none;
      }

      .confirmBtn:hover {
        transform: translate(0px, 0px);
        transition: transform 0.2s;
        background-color: rgba(0, 97, 172, 0.8);
      }
    }
  }
}

.el-popup-parent--hidden .has-sidebar {
  width: auto;
}

@media only screen and (max-width: 833px) {
  .jobDetailsDiv {
    padding-top: 10px;

    .bgView {
      padding: 40px 20px;
      margin-top: 50px;

      .title1 {
        font-size: 16px;
        line-height: 24px;
      }

      .title2 {
        font-size: 12px;
        line-height: 18px;
      }

      .title3 {
        font-size: 14px;
        margin-top: 20px;
        line-height: 22px;
      }

      .title4 {
        font-size: 10px;
        line-height: 16px;
      }

      .deliverBtn {
        margin-top: 40px;
        width: 92px;
        height: 24px;
        font-size: 10px;
        line-height: 0;
      }
    }

    .buttomDiv {
      margin-top: 40px;
    }

    .dialogDiv {
      /deep/ .el-dialog {
        .el-dialog__title {
          font-size: 12px;
        }

        .el-dialog__body {
          padding-top: 0;
          padding-bottom: 20px;
        }

        .titleDiv {
          font-size: 12px;
          color: #999999;
          margin-top: 20px;
          line-height: 18px;
        }

        .title1 {
          font-size: 16px;
          line-height: 24px;
        }

        .el-input__inner {
          height: 24px;
          line-height: 24px;
          font-size: 10px;
        }

        .el-radio__label {
          font-size: 11px;
        }

        .basicInfoDiv {
          width: 100%;

          .nameInput {
            width: 100%;
          }

          .basicTitle {
            font-size: 12px;
            line-height: 18px;
            margin: 16px 0 10px 0;
          }

          .el-input-group {
            .el-select {
              width: 70px;
              vertical-align: inherit;
            }

            .el-input__inner {
              padding-right: 18px;
              padding-left: 8px;
            }

            .el-input__suffix {
              right: 0;
            }

            .el-input__icon {
              height: 22px;
              line-height: 22px;
              width: 20px;
            }
          }
        }

        .workExperienceDiv {
          width: 100%;

          .itemDiv {
            width: 100%;

            .workExperienceDatePicker {
              width: 47%;
            }

            .separator {
              width: 6%;
            }

            .workExperienceTitle {
              font-size: 12px;
              line-height: 18px;
              margin: 16px 0 10px 0;
            }

            .workExperienceDatePicker {
              .el-input__icon {
                line-height: 16px;
              }

              .el-range-input,
              .el-range-separator {
                font-size: 10px;
              }

              .el-range-input {
                width: 37%;
              }

              .el-range-separator {
                width: 9%;
              }
            }
          }

          .checkBoxDiv {
            line-height: 14px;

            .el-checkbox__label {
              font-size: 10px;
              line-height: 14px;
            }
          }
        }

        .addWorkExperienceBtn {
          font-size: 12px;
          line-height: 18px;
        }

        .confirmBtn {
          width: 92px;
          height: 24px;
          font-size: 10px;
          line-height: 0;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
<style>
@media only screen and (max-width: 833px) {
  .el-date-picker.has-sidebar.DatePickerPopper {
    width: auto;
  }

  .DatePickerPopper .el-picker-panel__sidebar {
    top: auto;
    width: 100%;
    padding: 0 20px 18px 20px;
    border: 0;
  }

  .DatePickerPopper .el-picker-panel__sidebar + .el-picker-panel__body {
    margin-left: 0;
    margin-bottom: 50px;
  }

  .DatePickerPopper .el-picker-panel__shortcut {
    text-align: center;
    background-color: #f4f4f4;
    border-radius: 4px;
  }
}

.el-upload-dragger {
  background-color: #f4f4f4 !important;
  border-color: #f4f4f4;
}

.el-select {
  width: 100px;
}

.el-input-group__prepend {
  background-color: #ffffff;
}

.el-select-dropdown__item {
  font-size: 16px;
  font-family: SourceHanSansCN-Light;
  color: #999999;
}

.el-select-dropdown__item.selected {
  font-size: 16px;
  font-family: SourceHanSansCN-Light;
  color: #333333 !important;
}
</style>
