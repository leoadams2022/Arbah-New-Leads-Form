import React from "react";
import { Button, Label, TextInput } from "flowbite-react";
import ThemeToggleButton from "../components/ThemeToggleButton";
import ToggleableSection from "../components/ToggleableSection";
import TextAreaInput from "../components/TextAreaInput";
import { submitLeadToZoho } from "../Zoho";
import { googleSubmition } from "../Google";
import loadGif from "../assets/load.gif";
import { useAppDialog } from "../context/AppDialogProvider";
import InputText from "../components/InputText";
import InputSelect from "../components/InputSelect";
import SetDefaultValues from "./SetDefaultValues";
import {
  leadDispositionOptions,
  clickedAddOptions,
  leadSourceOptions,
  LeadStatusOptions,
  AgentsOptions,
} from "./options";

export default function Form() {
  const { alert, confirm } = useAppDialog();

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
  // const [Industry, setIndustry] = React.useState("");
  const [Description, setDescription] = React.useState("");
  const [Agent, setAgent] = React.useState("");

  const [isMoreFieldsOpen, setIsMoreFieldsOpen] = React.useState(false);
  const [isSetDefaultsOpen, setIsSetDefaultsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !LastName ||
      !Phone ||
      !ClickedAdd ||
      !Agent ||
      !LeadStatus ||
      !LeadDisposition ||
      !LeadSource ||
      !FileName
    ) {
      alert({
        title: "Missing Required Fields",
        message:
          "Please fill in all required fields before submitting the form.",
        variant: "red",
        durationMs: 3000,
      });
      return;
    }
    setIsSubmitting(true);

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

    try {
      const zohoSuccess = await submitLeadToZoho(data);
      const googleSuccess = await googleSubmition(data);
      if (zohoSuccess.ok && googleSuccess.ok) {
        alert({
          title: "Success",
          message: "Lead submitted successfully.",
          variant: "green",
          durationMs: 2000,
        });
        handleReset(e, false);
      } else {
        alert({
          title: "Submission Failed",
          message: `Zoho Status: ${zohoSuccess.status}, Google Status: ${googleSuccess.status}`,
          variant: "red",
          durationMs: 4000,
        });
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      alert(`Error submitting lead: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = async (e, con = false) => {
    e.preventDefault();
    if (con) {
      const ok = await confirm({
        title: "Reset the Form ?",
        message: "all entries will be set to default values.",
        variant: "red",
        confirmText: "Reset",
        cancelText: "Cancel",
      });
      if (!ok) {
        return;
      }
    }
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

    setIsMoreFieldsOpen(false);

    if (con) {
      alert({
        title: "Form Reseted",
        message: "All entries have been set to default.",
        variant: "green",
        durationMs: 1500,
      });
    }
  };

  const handleClear = async (e, con = false) => {
    e.preventDefault();
    if (con) {
      const ok = await confirm({
        title: "Clear the Form ?",
        message: "all entries will be cleared",
        variant: "red",
        confirmText: "Clear",
        cancelText: "Cancel",
      });
      if (!ok) {
        return;
      }
    }

    /*
      Clear all fields without loading defaults
       */
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

    setIsMoreFieldsOpen(false);

    if (con) {
      alert({
        title: "Form Cleared",
        message: "All entries have been cleared.",
        variant: "green",
        durationMs: 1500,
      });
    }
  };

  React.useEffect(() => {
    if (!isSetDefaultsOpen) {
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
    }
  }, [isSetDefaultsOpen]);

  return (
    <div
      className={`h-svh w-svw flex justify-center items-center bg text overflow-hidden`}
    >
      <div className="relative bg-pop w-[90%] sm:max-w-lg max-h-[90%] rounded  shadow-lg pt-12 pb-6 px-4 flex flex-col gap-4 overflow-auto transition-all duration-300">
        {/* Theme Toggle Button  */}
        <div className=" absolute top-2 right-2">
          <ThemeToggleButton />
          <SetDefaultValues
            isOpen={isSetDefaultsOpen}
            setIsOpen={setIsSetDefaultsOpen}
          />
        </div>
        {/* title / discription */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold line-clamp-1 text-pop">
            Arbah New Leads Form
          </h1>
          <h2 className="text-sm font-bold italic line-clamp-2 text-dem">
            you add new leads here.{" "}
          </h2>
        </div>

        <form
          action=""
          className="space-y-4 py-4 relative"
          onSubmit={handleSubmit}
        >
          <InputText
            id="LastName"
            name="LastName"
            label="Last Name"
            placeholder="Enter Last Name"
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
            required
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
            required
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
            required={true}
          />

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
            required={true}
          />
          <ToggleableSection
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
          >
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
                required={true}
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
                required={true}
              />
            </div>
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
              required={true}
            />

            <InputText
              id="FileName"
              name="FileName"
              label="File Name"
              placeholder="Enter File Name"
              value={FileName}
              onChange={(e) => setFileName(e.target.value)}
              required
            />

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
              id="Comload.gifpany"
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
          </ToggleableSection>

          <div className="flex justify-evenly items-center gap-2">
            <Button
              outline={true}
              className=" cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </Button>
            <Button
              outline={true}
              className=" cursor-pointer"
              type="reset"
              color={"red"}
              onClick={(e) => handleReset(e, true)}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button
              outline={true}
              className=" cursor-pointer"
              type="reset"
              color={"red"}
              onClick={(e) => handleClear(e, true)}
              disabled={isSubmitting}
            >
              Clear
            </Button>
          </div>
          <div
            className={`size-full  absolute top-0 left-0 flex justify-center items-center ${
              isSubmitting ? "" : "hidden"
            }`}
          >
            <img src={loadGif} alt="loading" className="w-[80%]" />
          </div>
        </form>
      </div>
    </div>
  );
}
