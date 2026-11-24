<template>
  <div class="dialogPop">
    <el-dialog
      :visible.sync="infomationDialogVisible"
      center
      top="10vh"
      :append-to-body="true"
      custom-class="batch-box"
      :close-on-click-modal="false"
    >
      <div class="dialogBg">
        <p class="title">联系我们</p>
        <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="112px"
          :label-position="{ true: 'top', false: 'left' }[$root.isMobile]"
          hide-required-asterisk
        >
          <el-form-item label="公司名称：" prop="companyName">
            <el-input
              v-model="form.companyName"
              placeholder="请填写公司名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系人：" prop="linkMan">
            <el-input
              v-model="form.linkMan"
              placeholder="请填写联系人"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" prop="mobile">
            <el-input
              v-model="form.mobile"
              placeholder="请填写联系方式"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="form.email" placeholder="请填写邮箱"></el-input>
          </el-form-item>
          <el-form-item label="所在区域：" required>
            <el-col :span="11">
              <el-form-item prop="province">
                <el-select
                  v-model="form.province"
                  style="width: 100%"
                  placeholder="省"
                  @change="provinceChange"
                  clearable
                >
                  <el-option
                    v-for="item in provinceList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item prop="city">
                <el-select
                  v-model="form.city"
                  placeholder="市区"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="item in cityList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item prop="address">
            <el-input
              v-model="form.address"
              placeholder="请填写详细地址"
            ></el-input>
          </el-form-item>
          <el-form-item label="感兴趣的内容：" prop="products">
            <el-select
              v-model="value"
              @change="productsChange"
              collapse-tags
              :popper-append-to-body="false"
              multiple
              :multiple-limit="5"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in productList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="submitButton" @click="onSubmit"
          >提交</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="infomationDialogVisible2"
      center
      top="10vh"
      :append-to-body="true"
      custom-class="batch-box"
      :close-on-click-modal="false"
    >
      <div class="dialogBg">
        <p class="title">Contact us</p>
        <el-form
          ref="form2"
          :model="form"
          :label-position="{ true: 'top', false: 'left' }[$root.isMobile]"
          :rules="rules2"
          label-width="130px"
        >
          <el-form-item label="Company:" prop="companyName">
            <el-input
              v-model="form.companyName"
              placeholder="Please fill in Company:"
            ></el-input>
          </el-form-item>
          <el-form-item label="Full name:" prop="linkMan">
            <el-input
              v-model="form.linkMan"
              placeholder="Please fill in Full name"
            ></el-input>
          </el-form-item>
          <el-form-item label="Phone:" prop="mobile">
            <el-col :span="10">
              <el-form-item prop="mobileCode">
                <el-select
                  v-model="form.mobileCode"
                  filterable
                  style="width: 100%"
                  placeholder="country code"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in phoneCodeList"
                    :key="index"
                    :label="item.code + '/' + item.country"
                    :value="item.code"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="13">
              <el-form-item prop="mobile">
                <el-input
                  v-model="form.mobile"
                  placeholder="Please fill in Phone"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="Email:" prop="email">
            <el-input
              v-model="form.email"
              placeholder="Please fill in Email"
            ></el-input>
          </el-form-item>
          <el-form-item label="Address:" required style="height: '50px'">
            <el-col :span="10">
              <el-form-item prop="country">
                <el-select
                  v-model="form.country"
                  filterable
                  style="width: 100%"
                  placeholder="Country"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in countryList"
                    :key="index"
                    :label="item.country"
                    :value="item.country"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="13">
              <el-form-item prop="city">
                <el-input v-model="form.city" placeholder="city"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="Interested in:" prop="products">
            <el-select
              v-model="value"
              @change="productsChange"
              collapse-tags
              :popper-append-to-body="false"
              multiple
              :multiple-limit="5"
              clearable=""
              placeholder="Please choose"
              style="width: 100%"
            >
              <el-option
                v-for="item in productList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="submitButton" @click="onSubmit"
          >submit</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getDistricts,
  addLinkInfo,
  getIndexProductList,
  getPhoneCodeList,
  getCountryList,
} from "@/api/serviceApi";

export default {
  props: {
    language: {
      type: String,
      default: "cn",
    },
  },
  name: "dialogPop",
  data() {
    const companyNameValidator = (rule, value, callback) => {
      if (value) {
        var reg = /^[\u4e00-\u9fa5A-Za-z]+$/;
        if (reg.test(value) === false) {
          callback(new Error("只可以输入中英文！"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const linkManValidator = (rule, value, callback) => {
      if (value) {
        var reg = /^[\u4e00-\u9fa5A-Za-z]+$/;
        if (reg.test(value) === false) {
          callback(new Error("只可以输入中英文！"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const mobileValidator = (rule, value, callback) => {
      if (value) {
        var reg = /^[0-9-]+$/;
        if (reg.test(value) === false) {
          callback(new Error("只可以输入数字和  -"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const emailValidator = (rule, value, callback) => {
      if (value) {
        var reg =
          /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        if (reg.test(value) === false) {
          callback(new Error("请输入正确的邮箱格式！"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      infomationDialogVisible: false,
      infomationDialogVisible2: false,
      form: {
        companyName: "",
        linkMan: "",
        mobile: "",
        mobileCode: "",
        email: "",
        country: "",
        province: "",
        city: "",
        address: "",
        products: [],
      },
      rules: {
        companyName: [
          { required: true, message: "请填写公司名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在1~20个汉字、字母",
            trigger: "blur",
          },
          { required: true, trigger: "blur", validator: companyNameValidator },
        ],
        linkMan: [
          { required: true, message: "请填写联系人", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在1~20个汉字、字母",
            trigger: "blur",
          },
          { required: true, trigger: "blur", validator: linkManValidator },
        ],
        mobile: [
          { required: true, message: "请填写联系方式", trigger: "blur" },
          { min: 1, max: 11, message: "长度在1~11数字和  -", trigger: "blur" },
          { required: true, trigger: "blur", validator: mobileValidator },
        ],
        email: [
          { required: true, message: "请填写邮箱", trigger: "blur" },
          { required: true, trigger: "blur", validator: emailValidator },
        ],
        province: [
          { required: true, message: "请选择省份", trigger: "change" },
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        address: [
          { required: true, message: "请填写详细地址", trigger: "blur" },
        ],
        products: [
          { required: true, message: "请选择感兴趣内容", trigger: "change" },
        ],
      },
      rules2: {
        companyName: [
          {
            required: true,
            message: "Please fill in Company",
            trigger: "blur",
          },
        ],
        linkMan: [
          {
            required: true,
            message: "Please fill in Full name",
            trigger: "blur",
          },
        ],
        mobileCode: [
          {
            required: false,
            trigger: "change",
          },
          {
            validator: this.validateMobileAndCode,
            trigger: "change,blur",
          },
        ],
        mobile: [
          {
            required: false,
            trigger: "blur",
          },
          {
            validator: this.validateMobileAndCode,
            trigger: "input,blur",
          },
          {
            pattern: /^\d{5,15}$/,
            message: "Please enter a valid Phone number",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "Please fill in Email", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Please enter a valid Email address",
            trigger: "blur",
          },
        ],
        country: [
          {
            required: true,
            message: "Please choose country",
            trigger: "change",
          },
        ],
        city: [
          { required: true, message: "Please fill in city", trigger: "blur" },
        ],
        products: [
          {
            required: true,
            message: "Please select the product of interest",
            trigger: "change",
          },
        ],
      },
      phoneCodeList: [],
      countryList: [],
      provinceList: [],
      cityList: [],
      productList: [],
      value: [],
    };
  },
  created() {},
  mounted() {},
  methods: {
    openDialog() {
      if (this.language == "cn") {
        this.clearForm();
        this.getProvinceList();
        this.getProductData();
        this.infomationDialogVisible = true;
        if (this.$refs["form"]) {
          this.$refs["form"].resetFields();
        }
      } else {
        this.clearForm();
        this.getPhoneCodeListData();
        this.getCountryListData();
        this.getProductData();
        this.infomationDialogVisible2 = true;
        if (this.$refs["form2"]) {
          this.$refs["form2"].resetFields();
        }
      }
    },
    getPhoneCodeListData() {
      getPhoneCodeList().then((res) => {
        if (res.status == 200) {
          this.phoneCodeList = res.data;
        }
      });
    },
    getCountryListData() {
      getCountryList().then((res) => {
        if (res.status == 200) {
          this.countryList = res.data;
        }
      });
    },
    getProductData() {
      var dic = {
        language: this.language,
        client: this.$root.isMobile ? "phone" : "web",
      };
      getIndexProductList(dic).then((res) => {
        if (res.status == 200) {
          this.productList = res.data;
        }
      });
    },
    getProvinceList() {
      getDistricts({
        fid: "",
      }).then((res) => {
        if (res.status == 200) {
          this.provinceList = res.data.result;
        }
      });
    },
    provinceChange(value) {
      this.cityList = [];
      this.form.city = "";
      if (this.form.province.length > 0) {
        var id = "";
        for (let i = 0; i < this.provinceList.length; i++) {
          const element = this.provinceList[i];
          if (element.name == value) {
            id = element.id;
            break;
          }
        }
        //province不为空，请求cityList数据
        getDistricts({
          fid: id,
        }).then((res) => {
          if (res.status == 200) {
            this.cityList = res.data.result;
          }
        });
      }
    },

    productsChange(value) {
      var array = [];
      for (let i = 0; i < this.productList.length; i++) {
        const element = this.productList[i];
        if (value.includes(element.id)) {
          array.push({
            interestProductsId: element.id,
            interestProductsName: element.name,
          });
        }
      }
      this.form.products = array;
    },
    onSubmit() {
      if (this.language == "cn") {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            this.form.language = this.language;
            addLinkInfo(this.form).then((res) => {
              if (res.status == 200) {
                this.$message({
                  message: "提交成功，资料将发送到您的邮箱！",
                  type: "success",
                });
                this.infomationDialogVisible = false;
              }
            });
          } else {
            this.$message({
              message: "资料不全！",
              type: "error",
            });
            return;
          }
        });
      } else {
        this.$refs["form2"].validate((valid) => {
          if (valid) {
            this.form.language = this.language;
            addLinkInfo(this.form).then((res) => {
              if (res.status == 200) {
                this.$message({
                  message: "submit success!",
                  type: "success",
                });
                this.infomationDialogVisible2 = false;
              }
            });
          } else {
            this.$message({
              message: "please improve information!",
              type: "error",
            });
            return;
          }
        });
      }
    },
    clearForm() {
      this.form = {
        companyName: "",
        linkMan: "",
        mobileCode: "",
        mobile: "",
        email: "",
        country: "",
        province: "",
        city: "",
        address: "",
        products: [],
      };
      this.cityList = [];
      this.value = [];
    },
  },
  beforeDestroy() {
    // $bus.$off("openDialogPop");
  },
};
</script>

<style scoped lang="less">
/deep/ .batch-box {
  max-width: 810px;
  width: 90vw;
  min-width: 335px;
  border-radius: 4px;

  .dialogBg {
    max-width: 610px;
    width: 73vw;
    min-width: 274px;
    margin: 0 auto;

    .el-form {
      .el-input__inner {
        height: 42px;
      }

      .el-select {
        width: 150px;
      }

      .el-form-item {
        // margin-bottom: 25px;
      }
    }

    .el-button {
      background: #005bac;
      font-size: 20px;
      padding: 13px 75px;
      color: #ffffff;
      border: none;
      box-shadow: none;
    }

    .el-button:hover {
      transform: translate(0px, 0px);
      transition: transform 0.2s;
      background: rgba(0, 97, 172, 0.8);
    }

    .el-form-item__label {
      font-size: 16px;
      color: #005bac;
      padding: 0;
    }

    .title {
      color: #005bac;
      font-size: 26px;
      font-weight: 500;
      text-align: center;
      margin-bottom: 40px;
    }
  }

  .submitButton {
    width: 190px;
    height: 48px;
    margin-bottom: 30px;
    background-color: #005bac;
    border-color: #005bac;
    color: #f4faff;
  }
}

@media only screen and (max-width: 833px) {
  /deep/ .batch-box {
    .dialogBg {
      .title {
        font-size: 16px;
        margin-bottom: 20px;
      }

      .el-form-item__label {
        font-size: 12px;
        line-height: 24px;
      }

      .el-form {
        .el-input__inner {
          height: 24px;
          font-size: 10px;
          padding: 0 12px;
        }

        .el-form-item__content {
          line-height: 24px;
        }

        .el-form-item__error {
          font-size: 10px;
        }

        .el-form-item {
          margin-bottom: 18px;
        }

        .el-input__icon {
          line-height: 24px;
        }

        .el-select {
          .el-input {
            .el-select__caret {
            }
          }
        }

        .el-form-item .el-form-item {
          margin-bottom: 0;
        }
      }
    }

    .submitButton {
      width: 275px;
      margin-bottom: 20px;
    }

    .el-dialog__header {
      padding-top: 5px;
    }
  }

  .el-select-dropdown__item,
  .el-select-dropdown__empty {
    font-size: 12px;
  }
}
</style>
<style>
.dialogPop .infomationDialogVisibleClass1 .dialogBg .el-select-group__title {
  font-size: 18px;
  color: black;
  line-height: 35px;
  padding-left: 15px;
  text-align: left;
}

.dialogPop .infomationDialogVisibleClass1 .dialogBg .el-select-dropdown__item {
  font-size: 14px;
  padding-left: 25px;
  text-align: left;
}

.dialogPop .batch-box .el-dialog__header {
  padding: 0 !important;
}

.dialogPop .batch-box .el-dialog__body {
  padding: 0 !important;
}
</style>
