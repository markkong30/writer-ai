import Badge from '@components/badge/Badge';
import Heading from '@components/heading/Heading';
import Paragraph from '@components/paragraph/Paragraph';

const DocumentationParams = () => {
  return (
    <div className='max-w-3xl flex flex-col gap-4 w-full mt-4'>
      <Heading size='xs'>Params</Heading>
      <Paragraph className='text-start' size='sm'>
        The api request takes two parameters:
      </Paragraph>
      <ul className='text-slate-700 dark:text-white list-none'>
        <li className="before:content-['•'] dark:before:text-white before:mr-2 before:text-black mb-2">
          <span>mode</span>
          <span>
            <Badge>type: Mode</Badge>
          </span>
        </li>
        <li className="before:content-['•'] dark:before:text-white before:mr-2 before:text-black mb-2">
          <span>input</span>
          <span>
            <Badge>type: String</Badge>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default DocumentationParams;
