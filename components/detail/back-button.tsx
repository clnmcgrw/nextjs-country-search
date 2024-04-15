'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Button from '@/components/shared/button';

const BackButton = ({ className, ...rest }: React.ComponentProps<'button'>) => {
  const { push } = useRouter();

  return (
    <Button {...rest} className={className} onClick={() => push('/')}>
      <ArrowLeft size={18} />
      <span>Back</span>
    </Button>
  );
};

export default BackButton;
