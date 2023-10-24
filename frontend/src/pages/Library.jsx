import Button from '@/components/lib/Button';
import Input from '@/components/lib/Input';
import { Tab, TabContent, Tabs, TabsList } from '@/components/lib/Tabs';

export default function Library() {
  return (
    <main>
      <h1>Library</h1>

      <h2>Button</h2>
      <Button variant="primary">Button</Button>

      <h2>Input</h2>
      <Input placeholder="Placeholder" />

      <h2>Tabs</h2>
      <Tabs defaultTab="tab1">
        <TabsList>
          <Tab value="tab1">Premiere Tab</Tab>
          <Tab value="tab2" count={2}>Deuxieme Tab</Tab>
          <Tab value="tab3">Troisième Tab</Tab>
        </TabsList>
        <TabContent value="tab1">
          <p>
            Tab 1 content
          </p>
        </TabContent>
        <TabContent value="tab2">
          <p>
            Tab 2 content
          </p>
        </TabContent>
        <TabContent value="tab3">
          <p>
            Tab 3 content
          </p>
        </TabContent>
      </Tabs >
    </main>
  );
}
