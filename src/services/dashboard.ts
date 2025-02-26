import PrivateAxiosInstance from './privateAxiosInstance';

const adminDashboardGet = async (rentalStatus?: string) => {
  try {
    const response = await PrivateAxiosInstance.get(
      '/admin/rentals/dashboard',
      {
        params: { rentalStatus },
      },
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

interface AdminRentalPatchProps {
  rentalHistoryId: number;
  rentalStatus: string;
}

const adminRentalPatch = async ({
  rentalHistoryId,
  rentalStatus,
}: AdminRentalPatchProps) => {
  try {
    const response = await PrivateAxiosInstance.patch(
      `/admin/rentals/${rentalHistoryId}`,
      { rentalStatus },
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

export { adminDashboardGet, adminRentalPatch };
