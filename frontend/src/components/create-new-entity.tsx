'use client';

import { useMutation } from '@tanstack/react-query';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Entity } from '@/lib/api';

export default function CreateNewEntity({
  mutationFn,
  entityTitle
}: {
  mutationFn: (name: string) => Promise<Entity>;
  entityTitle: string;
}) {
  const [entityName, setEntityName] = useState('');
  const [createdEntity, setCreatedEntity] = useState<Entity | null>(null);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: mutationFn,
    onSuccess: (data) => {
      setCreatedEntity(data);
    }
  });

  const handleCreateEntity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(entityName);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-green-600" />
            <CardTitle>Create New {entityTitle}</CardTitle>
          </div>
          <CardDescription>
            Add a new {entityTitle.toLowerCase()} to your database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateEntity} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="entityName">{entityTitle} Name</Label>
              <Input
                id="entityName"
                type="text"
                placeholder={`Enter ${entityTitle.toLowerCase()} name`}
                value={entityName}
                onChange={(e) => setEntityName(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isPending || !entityName.trim()}
            >
              {isPending ? 'Creating...' : `Create ${entityTitle}`}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Success/Error Banner */}
      {isSuccess && (
        <Alert
          className={
            isSuccess
              ? 'border-green-200 bg-green-50'
              : 'border-red-200 bg-red-50'
          }
        >
          {isSuccess ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription
            className={isSuccess ? 'text-green-800' : 'text-red-800'}
          >
            {isSuccess
              ? `${entityTitle} created successfully with ID: ${createdEntity?.id}`
              : `Failed to create ${entityTitle.toLowerCase()}`}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
