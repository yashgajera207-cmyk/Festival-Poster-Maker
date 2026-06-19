  "use client";

  import { useParams } from "next/navigation";
  import { useEffect, useState } from "react";
  import { Rnd } from "react-rnd";

  export default function ElementEditorPage() {
    const params = useParams();
    const templateId = params.id as string;

    const [template, setTemplate] = useState<any>(null);

    const [elements, setElements] = useState([
      {
        id: 1,
        type: "LOGO",
        x: 20,
        y: 20,
        width: 120,
        height: 120,
      },
      {
        id: 2,
        type: "BUSINESS_NAME",
        x: 200,
        y: 30,
        width: 400,
        height: 60,
      },
      {
        id: 3,
        type: "ADDRESS",
        x: 100,
        y: 500,
        width: 500,
        height: 40,
      },
      {
        id: 4,
        type: "PHONE",
        x: 100,
        y: 560,
        width: 250,
        height: 40,
      },
      {
        id: 5,
        type: "EMAIL",
        x: 100,
        y: 620,
        width: 350,
        height: 40,
      },
    ]);

    const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    fetchTemplate();
    fetchSavedLayout();
  }, []);
    async function fetchTemplate() {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
                query {
                  templates {
                    id
                    title
                    backgroundImage
                  }
                }
              `,
        }),
      });

      const result = await response.json();

      const found = result.data.templates.find(
        (item: any) => item.id === templateId,
      );

      setTemplate(found);
    }
  async function fetchSavedLayout() {
    try {
      const response = await fetch(
        "/api/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            query: `
              query Elements(
                $templateId: String!
              ) {
                elements(
                  templateId: $templateId
                ) {
                  id
                  elementType
                  xPosition
                  yPosition
                  width
                  height
                }
              }
            `,
            variables: {
              templateId,
            },
          }),
        }
      );

      const result =
        await response.json();

      const saved =
        result.data?.elements;
        console.log("SAVED:", saved);

      if (
        saved &&
        saved.length > 0
      ) {
        setElements(
          saved.map(
            (item: any) => ({
              id: item.id,
              type:
                item.elementType,
              x: item.xPosition,
              y: item.yPosition,
              width:
                item.width,
              height:
                item.height,
            })
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

    function updateSize(field: "width" | "height", value: number) {
      if (selected === null) return;

      setElements((prev) => {
        const updated = [...prev];

        updated[selected] = {
          ...updated[selected],
          [field]: value,
        };

        return updated;
      });
    }

    async function saveLayout() {
      try {
        const payload = elements.map((element) => ({
          templateId,
          elementType: element.type,
          xPosition: element.x,
          yPosition: element.y,
          width: element.width,
          height: element.height,
        }));

        const response = await fetch("/api/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
                  mutation SaveElements(
                    $elements: [TemplateElementInput!]!
                  ) {
                    saveTemplateElements(
                      elements: $elements
                    )
                  }
                `,
            variables: {
              elements: payload,
            },
          }),
        });

        const result = await response.json();

        console.log(result);

        alert("Layout Saved Successfully");
      } catch (error) {
        console.error(error);

        alert("Failed To Save Layout");
      }
    }

    if (!template) return <div className="p-10">Loading...</div>;

    return (
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-2 bg-white rounded-xl border p-4">
          <h2 className="font-bold text-lg mb-4">Elements</h2>

          {elements.map((element, index) => (
            <button
              key={element.id}
              onClick={() => setSelected(index)}
              className={`w-full p-3 rounded-lg border mb-2 text-left ${
                selected === index ? "bg-orange-100 border-orange-500" : ""
              }`}
            >
              {element.type}
            </button>
          ))}

          <button
            onClick={saveLayout}
            className="w-full mt-4 bg-orange-500 text-white py-3 rounded-lg"
          >
            Save Layout
          </button>
        </div>

        <div className="col-span-8">
          <div className="relative mx-auto border rounded-xl overflow-hidden bg-white min-h-[1000px]">
            <img src={template.backgroundImage} alt="" className="w-full" />

            {elements.map((element, index) => (
              <Rnd
                key={`${element.id}-${element.width}-${element.height}`}
                size={{
                  width: element.width,
                  height: element.height,
                }}
                position={{
                  x: element.x,
                  y: element.y,
                }}
                minWidth={50}
                minHeight={30}
                bounds="parent"
                onClick={() => setSelected(index)}
                onDragStop={(e, d) => {
                  setElements((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? {
                            ...item,
                            x: d.x,
                            y: d.y,
                          }
                        : item,
                    ),
                  );
                }}
                
                onResizeStop={(e, dir, ref, delta, pos) => {
                  setElements((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? {
                            ...item,
                            width: ref.offsetWidth,
                            height: ref.offsetHeight,
                            x: pos.x,
                            y: pos.y,
                          }
                        : item,
                    ),
                  );
                }}
              >
                <div
                  className={`w-full h-full border-2 bg-white/80 p-2 overflow-hidden ${
                    selected === index ? "border-orange-500" : "border-gray-300"
                  }`}
                >
                  <div className="w-full h-full bg-yellow-300 border-4 border-red-500">
                    {element.type}
                  </div>
                </div>
              </Rnd>
            ))}
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-xl border p-4">
          <h2 className="font-bold mb-4">Properties</h2>

          {selected !== null && (
            <>
              <div className="mb-3">
                <label className="text-sm">Width</label>

                <input
                  type="number"
                  value={elements[selected].width}
                  onChange={(e) => updateSize("width", Number(e.target.value))}
                  className="w-full border rounded p-2"
                />
              </div>

              <div className="mb-3">
                <label className="text-sm">Height</label>

                <input
                  type="number"
                  value={elements[selected].height}
                  onChange={(e) => updateSize("height", Number(e.target.value))}
                  className="w-full border rounded p-2"
                />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
