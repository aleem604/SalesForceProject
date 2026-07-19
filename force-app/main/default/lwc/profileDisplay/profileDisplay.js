import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getProfileInfo from '@salesforce/apex/LicenseAllocator.getProfileInfo';

const COLUMNS = [
    {
        label: 'Profile Name',
        fieldName: 'Name',
        type: 'text',
        sortable: true,
        wrapText: true,
        cellAttributes: {
            class: { fieldName: 'nameClass' }
        }
    },
    {
        label: 'License Type',
        fieldName: 'licenseName',
        type: 'text',
        sortable: true,
        wrapText: true
    },
    {
        label: 'Profile ID',
        fieldName: 'Id',
        type: 'text',
        sortable: true,
        wrapText: true
    },
    {
        label: 'Actions',
        type: 'action',
        typeAttributes: {
            rowActions: [
                { label: 'View Details', name: 'view' },
                { label: 'Select Profile', name: 'select' }
            ]
        },
        fixedWidth: 120
    }
];

const PAGE_SIZE_OPTIONS = [
    { label: '5 rows', value: '5' },
    { label: '10 rows', value: '10' },
    { label: '25 rows', value: '25' },
    { label: '50 rows', value: '50' }
];

export default class ProfileDisplay extends LightningElement {
    columns = COLUMNS;
    profiles = [];
    error;
    isLoading = true;

    searchTerm = '';
    sortField = 'Name';
    sortDirection = 'asc';

    currentPage = 1;
    pageSize = 10;

    wiredProfilesResult;

    @wire(getProfileInfo)
    wiredProfiles(result) {
        this.wiredProfilesResult = result;

        const { data, error } = result;

        if (data) {
            this.profiles = data.map((profile) => ({
                ...profile,
                licenseName:
                    profile.UserLicense && profile.UserLicense.Name
                        ? profile.UserLicense.Name
                        : 'N/A',
                nameClass: 'slds-text-title_bold'
            }));

            this.error = undefined;
            this.currentPage = 1;
            this.isLoading = false;
        } else if (error) {
            this.profiles = [];
            this.error = this.reduceError(error);
            this.isLoading = false;

            // eslint-disable-next-line no-console
            console.error('Error loading profiles:', error);
        }
    }

    get filteredProfiles() {
        const searchValue = this.searchTerm.trim().toLowerCase();
        let rows = [...this.profiles];

        if (searchValue) {
            rows = rows.filter((profile) => {
                const profileName = (profile.Name || '').toLowerCase();
                const licenseName = (profile.licenseName || '').toLowerCase();

                return (
                    profileName.includes(searchValue) ||
                    licenseName.includes(searchValue)
                );
            });
        }

        const direction = this.sortDirection === 'asc' ? 1 : -1;
        const fieldName = this.sortField;

        return rows.sort((first, second) => {
            const firstValue =
                first[fieldName] == null
                    ? ''
                    : String(first[fieldName]);

            const secondValue =
                second[fieldName] == null
                    ? ''
                    : String(second[fieldName]);

            return (
                firstValue.localeCompare(secondValue, undefined, {
                    numeric: true,
                    sensitivity: 'base'
                }) * direction
            );
        });
    }

    get paginatedProfiles() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;

        return this.filteredProfiles.slice(startIndex, endIndex);
    }

    get totalProfiles() {
        return this.profiles.length;
    }

    get profileCount() {
        return this.filteredProfiles.length;
    }

    get totalPages() {
        return Math.max(
            1,
            Math.ceil(this.profileCount / this.pageSize)
        );
    }

    get pageSizeOptions() {
        return PAGE_SIZE_OPTIONS;
    }

    get pageSizeValue() {
        return String(this.pageSize);
    }

    get firstRecordNumber() {
        if (this.profileCount === 0) {
            return 0;
        }

        return (this.currentPage - 1) * this.pageSize + 1;
    }

    get lastRecordNumber() {
        return Math.min(
            this.currentPage * this.pageSize,
            this.profileCount
        );
    }

    get rowNumberOffset() {
        return (this.currentPage - 1) * this.pageSize;
    }

    get isFirstPage() {
        return this.currentPage <= 1;
    }

    get isLastPage() {
        return this.currentPage >= this.totalPages;
    }

    get hasProfiles() {
        return this.filteredProfiles.length > 0;
    }

    get hasNoProfiles() {
        return !this.hasProfiles;
    }

    get hasNoSearchResults() {
        return (
            Boolean(this.searchTerm.trim()) &&
            this.profiles.length > 0 &&
            this.filteredProfiles.length === 0 &&
            !this.isLoading &&
            !this.showError
        );
    }

    get showError() {
        return Boolean(this.error);
    }

    get showEmptyState() {
        return (
            this.profiles.length === 0 &&
            !this.isLoading &&
            !this.showError
        );
    }

    handleSearch(event) {
        this.searchTerm = event.target.value || '';
        this.currentPage = 1;
    }

    handleClearSearch() {
        this.searchTerm = '';
        this.currentPage = 1;

        const searchInput = this.template.querySelector(
            'lightning-input[data-id="profile-search"]'
        );

        if (searchInput) {
            searchInput.value = '';
        }
    }

    handleSort(event) {
        this.sortField = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.currentPage = 1;
    }

    handlePreviousPage() {
        if (!this.isFirstPage) {
            this.currentPage -= 1;
        }
    }

    handleNextPage() {
        if (!this.isLastPage) {
            this.currentPage += 1;
        }
    }

    handlePageSizeChange(event) {
        this.pageSize = Number(event.detail.value);
        this.currentPage = 1;
    }

    handleRefresh() {
        this.refreshProfiles();
    }

    handleRetry() {
        this.refreshProfiles();
    }

    refreshProfiles() {
        if (!this.wiredProfilesResult) {
            return;
        }

        this.isLoading = true;
        this.error = undefined;

        refreshApex(this.wiredProfilesResult)
            .catch((error) => {
                this.error = this.reduceError(error);

                // eslint-disable-next-line no-console
                console.error('Error refreshing profiles:', error);
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        if (actionName === 'view') {
            this.showProfileDetails(row);
        } else if (actionName === 'select') {
            this.handleProfileSelect(row);
        }
    }

    showProfileDetails(profile) {
        const profileDetailEvent = new CustomEvent('profiledetail', {
            detail: {
                profileId: profile.Id,
                profileName: profile.Name,
                licenseName: profile.licenseName
            },
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(profileDetailEvent);
    }

    handleProfileSelect(profile) {
        const profileSelectionEvent = new CustomEvent('profileselect', {
            detail: {
                profileId: profile.Id,
                profileName: profile.Name,
                licenseName: profile.licenseName,
                selectedProfile: { ...profile }
            },
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(profileSelectionEvent);
    }

    handleExport() {
        try {
            const data = this.filteredProfiles.map((profile) => ({
                Name: profile.Name,
                License: profile.licenseName,
                Id: profile.Id
            }));

            const jsonString = JSON.stringify(data, null, 2);

            const blob = new Blob([jsonString], {
                type: 'application/json'
            });

            const downloadUrl = URL.createObjectURL(blob);
            const anchor = document.createElement('a');

            anchor.href = downloadUrl;
            anchor.download =
                `profiles_${new Date().toISOString().slice(0, 10)}.json`;

            anchor.click();
            URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error exporting data:', error);

            this.error = 'Failed to export profile data.';
        }
    }

    reduceError(error) {
        if (error && error.body) {
            if (Array.isArray(error.body)) {
                return error.body
                    .map((item) => item.message)
                    .join(', ');
            }

            if (error.body.message) {
                return error.body.message;
            }
        }

        if (error && error.message) {
            return error.message;
        }

        return 'An error occurred while loading profiles.';
    }
}