import { useMemo, useRef, useState } from "react";
import {
  Button,
  Input,
  Textarea,
  SelectComponent,
  Checkbox,
  Radio,
  Switch,
  Modal,
  Tabs,
  Card,
  ProgressBar,
  RangeSlider,
  Date,
  DateRangePicker,
  Alert,
  SkeletonLoader,
  Accordion,
  Breadcrumb,
  TableClient,
  FileInput,
  Tooltip,
  Spinner,
  TableServer,
  Badge,
} from "@/components";
import { useToast } from "@components/ToastProvider";
import { FileWarning, Info, Search, SquareCheck } from "lucide-react";
import { useGetCharacters } from "../services/getData";
import { useDebounce } from "@/utils";

const Home = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(40);
  const [checked, setChecked] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(null);
  const [search, setSearch] = useState<string>("");

  const searchDebounce = useDebounce(search);

  const stableQuery = useMemo(() => {
    return {
      name: searchDebounce || undefined,
    };
  }, [searchDebounce]);

  const { addToast } = useToast();
  const tableServerRef = useRef(null);

  return (
    <div className="m-3 p-3">
      <div className="mb-5">
        <h1 className="text-3xl mb-3">Buttons</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex flex-wrap gap-3 mb-3">
              <Button variant="primary" styleType="solid">
                Button
              </Button>
              <Button variant="primary" styleType="outlined">
                Button
              </Button>
              <Button variant="primary" styleType="dashed">
                Button
              </Button>
              <Button variant="primary" styleType="filled">
                Button
              </Button>
              <Button variant="primary" styleType="text">
                Button
              </Button>
              <Button variant="primary" styleType="link">
                Button
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 mb-3">
              <Button variant="secondary" styleType="solid">
                Button
              </Button>
              <Button variant="secondary" styleType="outlined">
                Button
              </Button>
              <Button variant="secondary" styleType="dashed">
                Button
              </Button>
              <Button variant="secondary" styleType="filled">
                Button
              </Button>
              <Button variant="secondary" styleType="text">
                Button
              </Button>
              <Button variant="secondary" styleType="link">
                Button
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 mb-3">
              <Button variant="info" styleType="solid">
                Button
              </Button>
              <Button variant="info" styleType="outlined">
                Button
              </Button>
              <Button variant="info" styleType="dashed">
                Button
              </Button>
              <Button variant="info" styleType="filled">
                Button
              </Button>
              <Button variant="info" styleType="text">
                Button
              </Button>
              <Button variant="info" styleType="link">
                Button
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 mb-3">
              <Button variant="success" styleType="solid">
                Button
              </Button>
              <Button variant="success" styleType="outlined">
                Button
              </Button>
              <Button variant="success" styleType="dashed">
                Button
              </Button>
              <Button variant="success" styleType="filled">
                Button
              </Button>
              <Button variant="success" styleType="text">
                Button
              </Button>
              <Button variant="success" styleType="link">
                Button
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 mb-3">
              <Button variant="danger" styleType="solid">
                Button
              </Button>
              <Button variant="danger" styleType="outlined">
                Button
              </Button>
              <Button variant="danger" styleType="dashed">
                Button
              </Button>
              <Button variant="danger" styleType="filled">
                Button
              </Button>
              <Button variant="danger" styleType="text">
                Button
              </Button>
              <Button variant="danger" styleType="link">
                Button
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 mb-3">
              <Button variant="warning" styleType="solid">
                Button
              </Button>
              <Button variant="warning" styleType="outlined">
                Button
              </Button>
              <Button variant="warning" styleType="dashed">
                Button
              </Button>
              <Button variant="warning" styleType="filled">
                Button
              </Button>
              <Button variant="warning" styleType="text">
                Button
              </Button>
              <Button variant="warning" styleType="link">
                Button
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 mb-3">
              <Button variant="light" styleType="solid">
                Button
              </Button>
              <Button variant="light" styleType="outlined">
                Button
              </Button>
              <Button variant="light" styleType="dashed">
                Button
              </Button>
              <Button variant="light" styleType="filled">
                Button
              </Button>
              <Button variant="light" styleType="text">
                Button
              </Button>
              <Button variant="light" styleType="link">
                Button
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 mb-3">
              <Button variant="dark" styleType="solid">
                Button
              </Button>
              <Button variant="dark" styleType="outlined">
                Button
              </Button>
              <Button variant="dark" styleType="dashed">
                Button
              </Button>
              <Button variant="dark" styleType="filled">
                Button
              </Button>
              <Button variant="dark" styleType="text">
                Button
              </Button>
              <Button variant="dark" styleType="link">
                Button
              </Button>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap gap-3 gap-y-4 mb-5">
              <Button loading={true}>Submit</Button>
              <Button loading={true} styleType="dashed">
                Submit
              </Button>
              <Button disabled>Disabled</Button>
              <Button disabled styleType="dashed">
                Disabled
              </Button>
              <Button icon={Search} iconOnly></Button>
              <Button icon={Search} iconPosition="start">
                Button
              </Button>
              <Button icon={Search} iconPosition="end">
                Button
              </Button>
              <Button icon={Search} iconOnly styleType="dashed"></Button>
              <Button icon={Search} styleType="dashed">
                Button
              </Button>
              <Button icon={Search} iconPosition="end" styleType="dashed">
                Button
              </Button>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <h1 className="text-3xl mb-3">Form Elements</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <Input label="Name" placeholder="Enter your name" />
            <Input
              label="Email"
              placeholder="Enter your email"
              helperText="Helper text!"
              error="Invalid email"
            />
            <Input
              label="input with icon"
              placeholder="Search...."
              icon={Search}
            />
            <Input
              label="input with icon"
              placeholder="Search...."
              iconPosition="end"
              icon={Search}
            />
            <Textarea
              label="Message"
              placeholder="Write something..."
              helperText="Max 200 chars"
            />
            <ProgressBar value={progress} max={100} />
            <RangeSlider
              label="Adjust"
              value={progress}
              onChange={(e) => setProgress(e)}
              min={0}
              max={100}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Input label="Small" placeholder="...." inputSize="sm" />
            <Input label="Default" placeholder="...." inputSize="md" />
            <Input label="Large" placeholder="...." inputSize="lg" />
            <Input
              label="Password"
              placeholder="type password"
              type="password"
            />
            <SelectComponent
              label="Choose An Item"
              options={[
                { value: "chocolate", label: "Chocolate" },
                { value: "strawberry", label: "Strawberry" },
                { value: "vanilla", label: "Vanilla" },
              ]}
              placeholder="Choose Item"
            />
            <FileInput label="Upload file" onChange={() => {}} />
            <Checkbox label="Accept terms" />
            <Radio name="group1" label="Option 1" />
            <Radio name="group1" label="Option 2" />
            <Switch
              label="Enable"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h1 className="text-3xl mb-3">Modal & Toast</h1>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setOpenModal(true)}>Open Modal</Button>
              <Button
                variant="success"
                onClick={() => addToast("This is a success toast!", "success")}
              >
                Toast Success
              </Button>
              <Button
                variant="danger"
                onClick={() => addToast("This is an error toast!", "error")}
              >
                Toast Error
              </Button>
              <Button
                variant="warning"
                onClick={() => addToast("This is an warning toast!", "warning")}
              >
                Toast Warning
              </Button>
              <Button
                variant="info"
                onClick={() => addToast("This is an info toast!", "info")}
              >
                Toast Info
              </Button>
            </div>
          </div>
          <div>
            <h1 className="text-3xl mb-3">Tooltip</h1>
            <div className="flex flex-wrap gap-3">
              <Tooltip text="Hello, I'm tooltip!" position="bottom">
                <Button>Bottom</Button>
              </Tooltip>
              <Tooltip text="Hello, I'm tooltip!" position="top">
                <Button>Top</Button>
              </Tooltip>
              <Tooltip text="Hello, I'm tooltip!" position="left">
                <Button>Left</Button>
              </Tooltip>
              <Tooltip text="Hello, I'm tooltip!" position="right">
                <Button>Right</Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h1 className="text-3xl mb-3">Tabs</h1>
            <Tabs
              tabs={[
                { label: "Tab 1", content: <p>Content 1</p> },
                { label: "Tab 2", content: <p>Content 2</p> },
              ]}
            />
          </div>
          <div>
            <h1 className="text-3xl mb-3">Date Pickers</h1>
            <Date
              label="Select date"
              value={date}
              onChange={(e) => setDate(e)}
            />
            <DateRangePicker label="Select date range" onChange={() => {}} />
          </div>
          <div>
            <h1 className="text-3xl mb-3">Alerts</h1>
            <div className="flex flex-col gap-3">
              <Alert type="success">Success Alert</Alert>
              <Alert type="error">Error Alert</Alert>
              <Alert type="warning">Warning Alert</Alert>
              <Alert type="info">Info Alert</Alert>
            </div>
          </div>
          <div>
            <h1 className="text-3xl mb-3">Badge</h1>
            <div className="flex flex-wrap gap-3 mb-3">
              <Badge label="Primary" variant="primary" />
              <Badge label="Secondary" variant="secondary" />
              <Badge label="Success" variant="success" />
              <Badge label="Warning" variant="warning" />
              <Badge label="Danger" variant="danger" />
            </div>
            <div className="flex flex-wrap gap-3 mb-3">
              <Badge label="Primary" variant="primary" icon={Info} />
              <Badge label="Danger" variant="danger" icon={FileWarning} />
              <Badge label="Success" variant="success" icon={SquareCheck} />
            </div>
            <div className="flex gap-3">
              <Badge label="Primary" variant="primary" icon={Info} size="sm" />
              <Badge
                label="Danger"
                variant="danger"
                icon={FileWarning}
                size="md"
              />
              <Badge
                label="Success"
                variant="success"
                icon={SquareCheck}
                size="lg"
              />
            </div>
          </div>
          <div>
            <h1 className="text-3xl mb-3">Loading</h1>
            <div className="flex items-center flex-wrap gap-3 mb-3">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <Spinner size="sm" color="red-400" />
              <Spinner size="md" color="green-400" />
              <Spinner size="lg" color="yellow-400" />
            </div>
            <SkeletonLoader className="h-6" />
          </div>
          <div>
            <h1 className="text-3xl mb-3">Accordion</h1>
            <Accordion
              items={[
                { title: "Section 1", content: "Content for section 1" },
                { title: "Section 2", content: "Content for section 2" },
              ]}
            />
          </div>
          <div>
            <h1 className="text-3xl mb-3">Accordion</h1>
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Library", href: "/library" },
                { label: "Data", href: "/data" },
              ]}
            />
            <Breadcrumb
              items={[
                { label: "Home", href: "#" },
                { label: "Master", href: "#" },
                { label: "List", href: "#" },
                { label: "Create", href: "#" },
              ]}
            />
          </div>
          <div>
            <h1 className="text-3xl mb-3">Card</h1>
            <Card title="Card 1">
              <p>this is a card</p>
            </Card>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <h1 className="text-3xl mb-5 font-bold">Table (Client)</h1>
            <div className="flex flex-col gap-5">
              <TableClient
                columns={[
                  { header: "ID", key: "id" },
                  { header: "Name", key: "name" },
                  { header: "Email", key: "email" },
                ]}
                data={[
                  { id: 1, name: "Alice", email: "alice@mail.com" },
                  { id: 2, name: "Bob", email: "bob@mail.com" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <h1 className="text-3xl mb-5 font-bold">Table (Server)</h1>
            <div className="mb-5">
              <Input
                label=""
                placeholder="Search...."
                icon={Search}
                onChange={(e) => setSearch(e.target.value)}
                inputSize="sm"
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
              />
            </div>
            <TableServer
              columns={[
                { key: "name", header: "Name" },
                { key: "gender", header: "Gender" },
                { key: "species", header: "Species" },
                {
                  key: "status",
                  header: "Status",
                  render: (row) => {
                    const data = row.status;
                    let variant: "danger" | "primary" | "secondary" | "success" | "warning";
                    switch (data) {
                      case "Alive":
                        variant = "success";
                        break;
                      case "Dead":
                        variant = "danger";
                        break;
                      case "unknown":
                        variant = "warning";
                        break;
                      default:
                        variant = "primary";
                        break;
                    }
                    return <Badge label={row.status} variant={variant} />;
                  },
                },
              ]}
              apiController={useGetCharacters}
              tableRef={tableServerRef}
              query={stableQuery}
            />
          </div>
        </div>
      </div>
      <Modal
        size="lg"
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Example Modal"
        footer={
          <div className="flex justify-end gap-2">
            <Button
              variant="danger"
              styleType="outlined"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setOpenModal(false)}>
              Confirm
            </Button>
          </div>
        }
      >
        <p>This is modal content</p>
      </Modal>
    </div>
  );
};

export default Home;
