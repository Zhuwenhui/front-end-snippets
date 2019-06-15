//什么是回调？
//回调是函数的异步等价物。在给定任务完成时调用回调函数。
function login(callback) {
    callback(`You have successfully LoggedIn`);
}
login(function (result) {
    console.log(result);
});


(function (callback) {
    //do some operations
    callback(`You have successfully LoggedIn`);
})(function (result) {
    console.log(result);
});


function seriesCallbackHell() {
    const company = new Company({
        name: 'FullStackHour'
    });
    company.save((err, savedCmp) => {
        if (err) {
            return next(err);
        }
        const job = new Job({
            title: 'Node.js Developer',
            _company: savedCmp._id
        });
        job.save((err, savedJob) => {
            if (err) {
                return next(err);
            }
            const application = new Application({
                _job: savedJob._id,
                _company: savedCmp._id
            });
            application.save((err, savedApp) => {
                if (err) {
                    return next(err);
                }
                const licence = new Licence({
                    name: 'FREE',
                    _application: savedApp._id
                });
                licence.save((err, savedLic) => {
                    if (err) {
                        return next(err);
                    }
                    return res.json({
                        company: savedCmp,
                        job: savedJob,
                        application: savedApp,
                        licence: savedLic
                    });
                });
            });
        });
    });
}


function waterfallDemo(req, res, next) {
    const tasks = [
        function createCompany(cb) {
            const company = new Company({
                name: 'FullStackhour'
            });
            company.save(function(err, savedCompany) {
                if (err) {
                    return cb(err);
                }
                return cb(null, savedCompany);
            });
        },
        function createJob(company, cb) {
            const job = new Job({
                title: 'Node.js Developer',
                _company: company._id
            });
            job.save((err, savedJob) => {
                if (err) {
                    return cb(err);
                }
                return cb(null, {
                    job: savedJob,
                    company
                });
            });
        },
        function createApplication(result, cb) {
            const application = new Application({
                _job: result.job._id,
                _company: result.company._id
            });
            application.save((err, savedApp) => {
                if (err) {
                    return cb(err);
                }
                return cb(null, {
                    job: result.job,
                    company: result.company,
                    application: savedApp
                });
            })
        },
        function createLicence(result, cb) {
            const licence = new Licence({
                name: 'FREE',
                _application: result.application._id
            });
            licence.save((err, savedLic) => {
                if (err) {
                    return cb(err);
                }
                return cb(null, {
                    job: result.job,
                    company: result.company,
                    application: result.application,
                    licence: savedLic
                });
            })
        }
    ];
    async.waterfall(tasks, (err, results) => {
        if (err) {
            return next(err);
        }
        return res.json(results);
    })
}