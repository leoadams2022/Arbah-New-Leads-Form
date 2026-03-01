import React from "react";
import { useAppDialog } from "../context/AppDialogProvider";
import {
  leadDispositionOptions,
  clickedAddOptions,
  leadSourceOptions,
  LeadStatusOptions,
  AgentsOptions,
} from "./options";
import ThemeToggleButton from "../components/ThemeToggleButton";
import InputText from "../components/InputText";
import InputSelect from "../components/InputSelect";
import TextAreaInput from "../components/TextAreaInput";
import { Button } from "flowbite-react";

function SetDefaultValues({ setIsOpen, isOpen }) {
  const { alert, confirm } = useAppDialog();
  const containerRef = React.useRef(null);
  const [LastName, setLastName] = React.useState("");
  const [Phone, setPhone] = React.useState("");
  const [ClickedAdd, setClickedAdd] = React.useState("");
  const [LeadStatus, setLeadStatus] = React.useState("");
  const [LeadDisposition, setLeadDisposition] = React.useState("");
  const [LeadSource, setLeadSource] = React.useState("");
  const [FileName, setFileName] = React.useState("");
  const [Mobile, setMobile] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [Company, setCompany] = React.useState("");
  const [Website, setWebsite] = React.useState("");
  const [Description, setDescription] = React.useState("");
  const [Agent, setAgent] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // save to localStorage
    console.log("Saved default values");

    const data = {
      LastName,
      Phone,
      ClickedAdd,
      Agent,
      LeadStatus,
      LeadDisposition,
      LeadSource,
      FileName,
      Mobile,
      Email,
      Company,
      Website,
      Description,
    };
    localStorage.setItem("defaultValues", JSON.stringify(data));
    handleCancel(null, false);
    setTimeout(() => {
      alert({
        title: "Default Values Saved",
        message: "Your default values have been saved successfully.",
        variant: "green",
        durationMs: 2000,
      });
    }, 300);
  };
  const handleCancel = async (e, con = true) => {
    if (e) e.preventDefault();
    const cancel = () => {
      setIsOpen(false);
      clearValues();
      // scroll to top of container
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    };
    if (!con) {
      cancel();
      return;
    }
    const ok = await confirm({
      title: "Cancel seting default values?",
      message: "all changes will be lost",
      variant: "red",
      confirmText: "Cancel/Close",
      cancelText: "Continue Editing",
    });
    if (ok) {
      setTimeout(() => {
        cancel();
      }, 300);
    }
  };
  const clearValues = () => {
    setLastName("");
    setPhone("");
    setClickedAdd("");
    setAgent("");
    setLeadStatus("");
    setLeadDisposition("");
    setLeadSource("");
    setFileName("");
    setMobile("");
    setEmail("");
    setCompany("");
    setWebsite("");
    setDescription("");
  };

  React.useEffect(() => {
    // if (isOpen) {
    // load from localStorage
    const data = JSON.parse(localStorage.getItem("defaultValues")) || {};
    setLastName(data.LastName || "");
    setPhone(data.Phone || "");
    setClickedAdd(data.ClickedAdd || "");
    setAgent(data.Agent || "");
    setLeadStatus(data.LeadStatus || "");
    setLeadDisposition(data.LeadDisposition || "");
    setLeadSource(data.LeadSource || "");
    setFileName(data.FileName || "");
    setMobile(data.Mobile || "");
    setEmail(data.Email || "");
    setCompany(data.Company || "");
    setWebsite(data.Website || "");
    setDescription(data.Description || "");
    // }
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        color="alternative"
        className="size-8 cursor-pointer overflow-hidden rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
      </button>
      <div
        className={`fixed top-0 left-0 h-svh w-svw z-50 bg text flex items-center justify-center ${
          isOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        } transition-all duration-300`}
        onClick={handleCancel}
      >
        <div
          className="relative bg-pop w-[90%] sm:max-w-lg max-h-[90%] rounded  shadow-lg pt-12 pb-6 px-4 flex flex-col gap-4 overflow-auto transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
          }}
          ref={containerRef}
        >
          {/* Theme Toggle Button  */}
          <div className=" absolute top-2 right-2">
            <ThemeToggleButton />
            <button
              onClick={handleCancel}
              className="size-8 cursor-pointer overflow-hidden rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* title / discription */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold line-clamp-1 text-pop">
              Default Values{" "}
            </h1>
            <h2 className="text-sm font-bold italic line-clamp-2 text-dem">
              you can set default values here.{" "}
            </h2>
          </div>
          <form action="" className="space-y-4 py-4" onSubmit={handleSubmit}>
            <InputText
              id="LastName"
              name="LastName"
              label="Last Name"
              placeholder="Enter Last Name"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              //   required
            />
            <InputText
              id="Phone"
              name="Phone"
              label="Phone"
              placeholder="Enter Phone"
              value={Phone}
              onChange={(e) => {
                let val = e.target.value.replace(/[^\d\s]/g, "");
                setPhone(val);
              }}
              //   required
            />
            <InputSelect
              id="clickedAdd"
              name="clickedAdd"
              label="Clicked Add"
              value={ClickedAdd}
              setValue={setClickedAdd}
              options={clickedAddOptions.map((opt) => {
                return {
                  label: opt,
                  value: opt,
                };
              })}
              containerClassName="flex-1"
              // required={true}
            />
            <InputSelect
              id="LeadSource"
              name="LeadSource"
              label="Lead Source"
              value={LeadSource}
              setValue={setLeadSource}
              options={leadSourceOptions.map((opt) => {
                return {
                  label: opt,
                  value: opt,
                };
              })}
              containerClassName="flex-1"
              // required={true}
            />
            <InputText
              id="FileName"
              name="FileName"
              label="File Name"
              placeholder="Enter File Name"
              value={FileName}
              onChange={(e) => setFileName(e.target.value)}
            />

            <div className="flex justify-between gap-2">
              <InputSelect
                id="LeadStatus"
                name="LeadStatus"
                label="Lead Status"
                value={LeadStatus}
                setValue={setLeadStatus}
                options={LeadStatusOptions.map((opt) => ({
                  label: opt,
                  value: opt,
                }))}
                containerClassName="flex-1"
                // required={true}
              />
              <InputSelect
                id="leadDisposition"
                name="leadDisposition"
                label="Lead Disposition"
                value={LeadDisposition}
                setValue={setLeadDisposition}
                options={leadDispositionOptions.map((opt) => ({
                  label: opt,
                  value: opt,
                }))}
                containerClassName="flex-1"
                // required={true}
              />
            </div>
            <InputSelect
              id="Agent"
              name="Agent"
              label="Your Name"
              selectLabel="Select Agent"
              value={Agent}
              setValue={setAgent}
              options={AgentsOptions.map((opt) => ({
                label: opt,
                value: opt,
              }))}
              //   required={true}
            />
            {/* <ToggleableSection
              isOpen={isMoreFieldsOpen}
              setIsOpen={setIsMoreFieldsOpen}
              buttonText={{ onOpen: "Show Less", onClose: "Show More" }}
              // buttonIcon
              rotateIcon={false}
              // buttonOnClick
              buttonClassName="focus:ring-1 cursor-pointer"
              ButtonOnOpenClassName=""
              ButtonOnCloseClassName=""
              buttonColor="alternative"
              outline={true}
              containerClassName="space-y-4 py-4"
              containerOnOpenClassName="h-[770px] opacity-100"
              containerOnCloseClassName="h-0 opacity-0"
              containerAfterCloseClassName="hidden"
              containerBeforeOpenClassName=""
              duration={300}
            > */}
            <InputText
              id="Mobile"
              name="Mobile"
              label="Mobile"
              placeholder="Enter Mobile"
              value={Mobile}
              onChange={(e) => {
                let val = e.target.value.replace(/[^\d\s]/g, "");
                setMobile(val);
              }}
            />

            <InputText
              id="Email"
              name="Email"
              label="Email"
              placeholder="Enter Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputText
              id="Company"
              name="Company"
              label="Company"
              placeholder="Enter Company"
              value={Company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <InputText
              id="Website"
              name="Website"
              label="Website"
              placeholder="Enter Website"
              value={Website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            {/* <InputSelect
              id="Industry"
              name="Industry"
              label="Industry"
              value={Industry}
              setValue={setIndustry}
              options={industryOptions.map((opt) => ({
                label: opt,
                value: opt,
              }))}
            /> */}
            <TextAreaInput
              id="Description"
              name="Description"
              label="Description"
              placeholder="Enter   Description"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="resize-none"
            />
            {/* </ToggleableSection> */}

            <div className="flex justify-evenly items-center gap-2">
              <Button outline={true} className=" cursor-pointer" type="submit">
                Savg
              </Button>
              <Button
                outline={true}
                className=" cursor-pointer"
                color={"red"}
                onClick={(e) => handleCancel(e)}
              >
                Cancel
              </Button>
            </div>
          </form>{" "}
        </div>
      </div>
    </>
  );
}

export default SetDefaultValues;
