import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";

const ArticleCreateForm = ({ formData, onChange }) => {
  return (
    <Form className="space-y-8 gap-8">
      <div className="flex flex-col gap-2 mb-10">
        <Label htmlFor="title" className="font-bold text-lg">
          *제목
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={onChange}
          className="bg-[#F3F4F6] font-medium text-[16px]"
          placeholder="제목을 입력해주세요"
        />
      </div>

      <div className="flex flex-col gap-2 ">
        <Label htmlFor="content" className="font-bold text-lg">
          *내용
        </Label>
        <Textarea
          id="content"
          placeholder="내용을 입력해주세요"
          value={formData.content}
          onChange={onChange}
          className="bg-[#F3F4F6] font-medium text-[16px]"
        />
      </div>

      {/* <Button type="submit">제출</Button> */}
    </Form>
  );
};

export default ArticleCreateForm;
