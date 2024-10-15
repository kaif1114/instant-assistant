"use client";
import React, { useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";

interface DataFieldEntry {
  pageContent: string;
  metadata: {
    title: string;
    description: string;
  };
}

export default function AssistantTraining() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [functionality, setFunctionality] = useState("");
  const [dataFields, setDataFields] = useState<DataFieldEntry[]>([
    { pageContent: "", metadata: { title: "", description: "" } },
  ]);
  const { user } = useUser();
  const assistantId = uuidv4();

  const addDataField = () => {
    setDataFields([
      ...dataFields,
      { pageContent: "", metadata: { title: "", description: "" } },
    ]);
  };

  const removeDataField = (index: number) => {
    const newDataFields = dataFields.filter((_, i) => i !== index);
    setDataFields(newDataFields);
  };

  const updateDataField = (
    index: number,
    field: "pageContent" | "title" | "description",
    value: string
  ) => {
    const newDataFields = [...dataFields];
    if (field === "pageContent") {
      newDataFields[index].pageContent = value;
    } else {
      newDataFields[index].metadata[field] = value;
    }
    setDataFields(newDataFields);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, description, functionality, dataFields });
    console.log(assistantId, user?.id);
    try {
      await axios.post("/api/assistants/create", {
        assistantId,
        name,
        description,
        userId: user?.id,
      });
      await axios.post("/api/savecontext", {
        assistantId,
        documents: dataFields,
      });

      console.log("Success");
    } catch (error) {
      console.log(error);
      throw new Error("Failed");
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="min-h-screen bg-[#0A0A15] text-[#0A0A15]">
        <header className="bg-[#478ACD] py-6 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Train Your AI Assistant</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <form
              onSubmit={(e) => {
                toast.promise(handleSubmit(e), {
                  loading: "Creating...",
                  success: <b>Assistant Created Successfully!</b>,
                  error: <b>Failed to create assistant.</b>,
                });
              }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Assistant Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter assistant name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#478ACD]"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-1"
                >
                  Assistant Description
                </label>
                <input
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short one-line description"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#478ACD]"
                />
              </div>
              <div>
                <label
                  htmlFor="functionality"
                  className="block text-sm font-medium mb-1"
                >
                  Functionality
                </label>
                <textarea
                  id="functionality"
                  value={functionality}
                  onChange={(e) => setFunctionality(e.target.value)}
                  placeholder="Describe how the assistant should function"
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#478ACD]"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Training Data</h2>
                {dataFields.map((field, index) => (
                  <div
                    key={index}
                    className="mb-6 p-4 bg-gray-50 rounded-lg shadow"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium">
                        Data Field {index + 1}
                      </h3>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeDataField(index)}
                          className="text-red-500 hover:text-red-700 focus:outline-none"
                        >
                          <XIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={field.metadata.title}
                          onChange={(e) =>
                            updateDataField(index, "title", e.target.value)
                          }
                          placeholder="Enter data field title"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#478ACD]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          value={field.metadata.description}
                          onChange={(e) =>
                            updateDataField(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Enter data field description"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#478ACD]"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-1">
                        Page Content
                      </label>
                      <textarea
                        value={field.pageContent}
                        onChange={(e) =>
                          updateDataField(index, "pageContent", e.target.value)
                        }
                        placeholder="Enter training data"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#478ACD]"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addDataField}
                  className="w-full py-2 px-4 border-2 border-dashed border-[#478ACD] rounded-md text-[#478ACD] hover:bg-[#478ACD] hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#478ACD] focus:ring-opacity-50"
                >
                  <PlusIcon className="inline-block mr-2 h-5 w-5" /> Add Data
                  Field
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#478ACD] text-white rounded-md hover:bg-[#3a7ab8] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#478ACD] focus:ring-opacity-50 text-lg font-semibold"
                >
                  Create Assistant
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
