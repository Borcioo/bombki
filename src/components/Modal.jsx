import { useState, useEffect } from "react";
import Ajv from "ajv";
import validator from "const/validator";
import { useSelector, useDispatch } from "react-redux";
import { setSettings } from "@/store/settingsSlice";
import translations from "const/translations.json";

export const Modal = ({ showModal, setShowModal, lang }) => {
  const settings = useSelector((state) => state.settings.settings);
  const dispatch = useDispatch();
  const [storeJson, setStoreJson] = useState(JSON.stringify(settings, null, 2) || "");

  useEffect(() => {
    setStoreJson(JSON.stringify(settings, null, 2));
  }, [settings]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleImport = (storeJson) => {
    try {
      const json = JSON.parse(storeJson);
      if (!json) {
        window.alert("Invalid JSON");
        return;
      }

      const ajv = new Ajv({ allErrors: true });
      const validate = ajv.compile(validator);

      const valid = validate(json);
      if (valid) {
        dispatch(setSettings(json));
        handleCloseModal();
      } else {
        window.alert("Invalid JSON");
      }
    } catch (e) {
      window.alert("Invalid JSON");
    }
  };

  return (
    <div
      id="small-modal"
      tabIndex="-1"
      className={`${
        showModal ? "fixed" : "hidden"
      } z-[10000] left-[50%] translate-x-[-50%] w-full max-w-[700px] translate-y-[-50%] top-[50%]`}
    >
      <div className=" w-full max-w-[700px] max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">{translations[lang].importProject}</h3>
            <button
              onClick={handleCloseModal}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="small-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-6 flex space-y-6 min-h-[300px]">
            <textarea
              onChange={(e) => setStoreJson(e.target.value)}
              rows={10}
              cols={50}
              value={storeJson}
              placeholder="Paste your project here..."
              className="w-full resize-none overflow-y-auto min-h-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700"
            />
          </div>

          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={() => handleImport(storeJson)}
              data-modal-hide="small-modal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Import
            </button>
            <button
              onClick={handleCloseModal}
              data-modal-hide="small-modal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              {translations[lang].reject}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
