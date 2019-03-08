import _http from './http/httpAxios'

export default {

  /**
   * 获取项目列表
   * @returns {*}
   * @constructor
   */
  _GetProject: function (params) {
    return _http.post('/api/project',params);
  },
  /**
   * 新增项目
   * @param params
   * @returns {*}
   * @private
   */
  _AddProject: function (params) {
    return _http.post('/api/project/create',params);
  },
  /**
   * 删除项目
   * @param params
   * @returns {*}
   * @private
   */
  _DeleteProject: function (params) {
    return _http.post('/api/project/delete',params);
  },
  /**
   * 编辑项目
   * @param params
   * @returns {*}
   * @private
   */
  _EditProject: function (params) {
    return _http.post('/api/project/update',params);
  },

  /**
   * 获取接口列表
   * @returns {*}
   * @constructor
   * @constructor
   */
  _GetInterface: function (params) {
    return _http.post('/api/interface/list',params);
  },
  /**
   * 新增接口
   * @returns {*}
   * @constructor
   * @constructor
   */
  _AddInterface: function (params) {
    return _http.post('/api/interface/create',params);
  },
  /**
   * 删除接口
   * @returns {*}
   * @constructor
   * @constructor
   */
  _DeleteInterface: function (params) {
    return _http.post('/api/interface/delete',params);
  },
  /**
   * 编辑接口
   * @returns {*}
   * @constructor
   * @constructor
   */
  _EditInterface: function (params) {
    return _http.post('/api/interface/update',params);
  },

  /**
   * 获取模拟数据
   * @returns {*}
   * @constructor
   * @constructor
   */
  _DoMock: function (mockUrl) {
    return _http.post('/mock'+mockUrl);
  },
  /**
   * 获取审核项目
   */
  _getWAProject: function (params) {
    return _http.post('/api/project/findWAP',params);
  },
  /**
   * 审核项目
   */
  _AuditProject: function (params) {
    return _http.post('/api/project/audit',params)
  },
  /**
   * 驳回项目
   */
  _BackProject: function (params) {
    return _http.post('/api/project/deleteWAP',params)
  }

}

