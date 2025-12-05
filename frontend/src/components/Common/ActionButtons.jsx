import React from 'react';
import { FaSave, FaSpinner } from 'react-icons/fa';

function ActionButtons({ saving, onCancel, onSubmitText = 'Update Product' }) {
  return (
    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 font-medium"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-azurio to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saving ? (
          <>
            <FaSpinner className="h-4 w-4 animate-spin mr-2" />
            Saving...
          </>
        ) : (
          <>
            <FaSave className="h-4 w-4 mr-2" />
            {onSubmitText}
          </>
        )}
      </button>
    </div>
  );
}

export default ActionButtons;
