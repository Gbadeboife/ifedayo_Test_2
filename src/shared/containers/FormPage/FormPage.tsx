import React, { memo, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';
import { Icon } from 'Components/Icons';
import { Tab } from 'Components/Tabs/Tab';
import { useUser } from 'Context/User';
import { firstCompanyIdSelector } from 'Containers/Projects/selectors';
import { handleApiRequest } from 'Utils/handleApiRequest';
import classes from './formPage.module.css';
import { format } from 'date-fns';

const CONTRACT_TAGS = [
  '~~~name~~~',
  '~~~project~~~',
  '~~~job_no~~~',
  '~~~company~~~',
  '~~~current_date~~~',
  '~~~date_of_loss~~~',
  '~~~company_address~~~',
  '~~~policy_holder_name~~~',
  '~~~policy_number~~~',
  '~~~claim_number~~~',
  '~~~input~~~',
  '~~~checkbox~~~',

];

const FormPage = () => {
  const dispatch = useDispatch();
  const user = useUser();
  const firstCompanyId = useSelector(firstCompanyIdSelector, areEqual);
  
  const [formTemplates, setFormTemplates] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [activeTab, setActiveTab] = useState('contract-forms-tab');
  const [showModal, setShowModal] = useState(false);
  const [formName, setFormName] = useState('');
  const [requireSignature, setRequireSignature] = useState(false);
  const [template, setTemplate] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editFormId, setEditFormId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteFormId, setDeleteFormId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch contract forms from API
  const fetchContractForms = useCallback(async () => {
    if (!firstCompanyId) return;
    setFetching(true);
    try {
      const fetchForms = () => async (dispatch, _getState = null, utils) => {
        const response = await handleApiRequest(
          dispatch,
          utils.Api.get(`/companies/${firstCompanyId}/contract-forms`)
        );
        console.log(response);
        if (response?.data) {
          setFormTemplates(response.data);
        }
        setFetching(false);
      };
      dispatch(fetchForms());
    } catch (error) {
      console.error('Error fetching contract forms:', error);
      setFetching(false);
    }
  }, [firstCompanyId, dispatch]);

  useEffect(() => {
    if (firstCompanyId) {
      fetchContractForms();
    }
  }, [firstCompanyId, fetchContractForms]);

  const onTabClick = (e) => {
    setActiveTab(e?.currentTarget?.id || activeTab);
  };

  const openModal = () => {
    setFormName('');
    setRequireSignature(false);
    setTemplate('');
    setError('');
    setEditMode(false);
    setEditFormId(null);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  // Add Contract
  const handleAddContract = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    setError('');
    try {
      const addContract = () => async (dispatch, _getState = null, utils) => {
        const response = await handleApiRequest(
          dispatch,
          utils.Api.post('/contract-forms', {
            company_id: firstCompanyId,
            name: formName,
            replacement_tags: CONTRACT_TAGS.join(','),
            status: 'active',
            template,
            has_signature: !!requireSignature,
          })
        );
        if (response?.data) {
          setShowModal(false);
          fetchContractForms();
        } else {
          setError('Failed to add contract form.');
        }
        setAddLoading(false);
      };
      dispatch(addContract());
    } catch (err) {
      setError('Failed to add contract form.');
      setAddLoading(false);
    }
  };

  // Edit Contract (manual save)
  const openEditModal = (form) => {
    setFormName(form.name || '');
    setRequireSignature(!!form.has_signature);
    setTemplate(form.template || '');
    setEditFormId(form.id);
    setEditMode(true);
    setError('');
    setShowModal(true);
  };

  const handleEditContract = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    setError('');
    console.log(template)
    try {
      const editContract = () => async (dispatch, _getState = null, utils) => {
        const response = await handleApiRequest(
          dispatch,
          utils.Api.put('/contract-forms', {
            company_id: firstCompanyId,
            name: formName,
            replacement_tags: CONTRACT_TAGS.join(','),
            status: 'active',
            template,
            has_signature: !!requireSignature,
            id: editFormId,
          })
        );
        console.log(response);
        if (response?.data) {
          setShowModal(false);
          fetchContractForms();
        } else {
          setError('Failed to update contract form.');
        }
        setAddLoading(false);
      };
      dispatch(editContract());
    } catch (err) {
      setError('Failed to update contract form.');
      setAddLoading(false);
    }
  };

  // Tag insertion (new line)
  const handleTagClick = (tag) => {
    setTemplate((prev) => (prev ? prev + '\n' + tag : tag));
  };

  // Delete Contract (with modal)
  const handleDeleteContract = (id) => {
    setDeleteFormId(id);
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    setDeleteLoading(true);
    const deleteContract = () => async (dispatch, _getState = null, utils) => {
      await handleApiRequest(
        dispatch,
        utils.Api.delete(`/contract-forms/${deleteFormId}`)
      );
      setShowDeleteModal(false);
      setDeleteLoading(false);
      fetchContractForms();
    };
    dispatch(deleteContract());
  };
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteFormId(null);
    setDeleteLoading(false);
  };

  const createTabs = (activeTab, onTabClick) => (
    <>
      <Tab
        key="contract-forms-tab"
        id="contract-forms-tab"
        className={`${classes.flexCenter} ${classes.button} ${activeTab === 'contract-forms-tab' ? `active ${classes['active-Tab']}` : ''}`}
        target="contract-forms"
        onClick={onTabClick}
      >
        <>
          <Icon type="edit" className={classes.icon} />
          <span>Contract Forms</span>
        </>
      </Tab>
    </>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className={classes.formPageBase}>
            <div className={classes.container}>
              {/* Contract Forms Tab */}
              <div className={classes.tabsWrapper}>
                <div className={classes.tabsContainer}>
                  <ul className={`nav nav-tabs ${classes.tabs}`} role="tablist">
                    {createTabs(activeTab, onTabClick)}
                  </ul>
                </div>
              </div>

              {/* Form Templates Section */}
              <div className={classes.formTemplatesSection}>
                <div className={classes.header}>
                  <div className={classes.headerContent}>
                    <h1 className={classes.title}>Form Templates</h1>
                    <button className={classes.addButton} onClick={openModal}>
                      Add +
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className={classes.tableContainer}>
                  {fetching ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                      <div className="spinner-border text-primary" role="status">
                      </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                  ) : formTemplates.length > 0 ? (
                    <table className={`table ${classes.table}`}>
                      <thead>
                        <tr>
                          <th>Template Name</th>
                          <th>Date Created</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {formTemplates.map((template, index) => (
                          <tr key={index} style={{ cursor: 'pointer' }} onClick={() => openEditModal(template)}>
                            <td className={`${classes.tableCell} ${classes.tableCellName}`}>
                              {template.name} 

                            </td>
                            <td className={`${classes.tableCell} ${classes.tableCellDate}`}>
                              {template.created_at ? format(new Date(template.created_at), 'MMM d, yyyy') : ''}
                            </td>
                            <td className={`${classes.tableCell} ${classes.tableCellActions}`} onClick={e => { e.stopPropagation(); handleDeleteContract(template.id); }}>
                              <button className={classes.deleteButton}>
                              <Icon type="trash" className={classes.deleteButtonIcon} />

                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                      <p className="text-muted">No form templates found.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Overlay */}
      {showModal && (
        <>
          <div className={classes.modalOverlay} />
          <div className={classes.modal}>
            <div className={classes.modalHeader}>
              <span className={classes.modalTitle}>{editMode ? 'Edit Contract Form' : 'Add Contract Form'}</span>
              <button onClick={closeModal} className={classes.modalClose}>&times;</button>
            </div>
            <form onSubmit={editMode ? handleEditContract : handleAddContract} className={classes.modalForm}>
              <label style={{ fontWeight: 500, marginBottom: 8 }}>Form Name</label>
              <input
                type="text"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                style={{ marginBottom: 16, padding: 8, fontSize: 16, borderRadius: 4, border: '1px solid #d2cfda', width: '100%' }}
                required
              />
              <label style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <input
                  type="checkbox"
                  checked={requireSignature}
                  onChange={e => setRequireSignature(e.target.checked)}
                  style={{ marginRight: 8 }}
                  disabled={editMode && addLoading}
                />
                Require Signature
              </label>
              <div style={{ display: 'flex', gap: 16, flex: 1 }}>
                <div style={{ minWidth: 180, width: 180, height: 220, border: '1px solid #d2cfda', borderRadius: 4, overflowY: 'auto', background: '#faf9fb', fontSize: 14, padding: 8 }}>
                  {CONTRACT_TAGS.map(tag => (
                    <div key={tag} style={{ marginBottom: 4, cursor: 'pointer', whiteSpace: 'nowrap' }} onClick={() => handleTagClick(tag)}>{tag}</div>
                  ))}
                </div>
                <textarea
                  value={template}
                  onChange={e => setTemplate(e.target.value)}
                  style={{ flex: 1, minHeight: 220, border: '1px solid #d2cfda', borderRadius: 4, padding: 8, fontSize: 15, resize: 'vertical' }}
                  placeholder="Contract Template"
                  required
                  disabled={editMode && addLoading}
                />
              </div>
              {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
              {!editMode && (
                <button type="submit" disabled={addLoading} style={{ marginTop: 32, alignSelf: 'center', background: '#9a00ff', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 48px', fontWeight: 600, fontSize: 18, cursor: 'pointer', opacity: addLoading ? 0.7 : 1 }}>
                  {addLoading ? 'Adding...' : 'Add Contract'}
                </button>
              )}
              {editMode && (
                <button type="submit" disabled={addLoading} style={{ marginTop: 32, alignSelf: 'center', background: '#9a00ff', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 48px', fontWeight: 600, fontSize: 18, cursor: 'pointer', opacity: addLoading ? 0.7 : 1 }}>
                  {addLoading ? 'Saving...' : 'Save Changes'}
                </button>
              )}
            </form>
          </div>
        </>
      )}
      {/* Delete Modal Overlay */}
      {showDeleteModal && (
        <>
          <div className={classes.deleteModalOverlay} />
          <div className={classes.deleteModal}>
            <div className={classes.deleteModalHeader}>
              <span className={classes.deleteModalTitle}>Delete Contract Form</span>
              <button onClick={cancelDelete} className={classes.deleteModalClose}>&times;</button>
            </div>
            <div className={classes.deleteModalBody}>
              Are You Sure You Want to Delete this Form?
            </div>
            <div className={classes.deleteModalActions}>
              <button onClick={confirmDelete} disabled={deleteLoading} className={classes.deleteModalDeleteBtn}>
                Delete
              </button>
              <button onClick={cancelDelete} disabled={deleteLoading} className={classes.deleteModalCancelBtn}>
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const FormPageMemo = memo(FormPage, areEqual);

export { FormPageMemo as FormPage }; 