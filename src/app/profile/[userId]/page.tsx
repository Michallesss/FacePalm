'use server';

interface ProfileParams {
  params: { 
    userId: string 
  } 
};

export default function Profile({ params }: ProfileParams) {
  return (
    <div>
      <h1>Profile: {params.userId}</h1>
    </div>
  );
}