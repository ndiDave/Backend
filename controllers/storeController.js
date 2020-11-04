const Store = require('./../models/storeModel');
const Stream = require("./schemaTypes/streamSchemaType");
const UserVariables = require("./schemaTypes/userSchemaType");
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

//Post Stores
exports.postStore = catchAsync(async (req, res, next) => {

    const {
        colorIndex,
        dualSelectValue,
        newStream,
        progress,
        scenarios,
        selectedAccount,
        selectedId,
        selectedPage,
        selectedScenario,
        selectedUser,

        desiredRetirementIncome,
        hasChildrenStatus,
        inflationRate,
        maritalStatus,
        MER,
        numberOfChildren,
        province,
        rate1,
        rate2
    } = req.body;

    const newUiReducer = {
        colorIndex,
        dualSelectValue,
        newStream,
        progress,
        scenarios,
        selectedAccount,
        selectedId,
        selectedPage,
        selectedScenario,
        selectedUser,
    };

    const newUserReducer = {

        desiredRetirementIncome,
        hasChildrenStatus,
        inflationRate,
        maritalStatus,
        MER,
        numberOfChildren,
        province,
        rate1,
        rate2
    };

    /*birthYear
    cppStartAge,
        firstName,
        gender,
        lastName,
        lifeSpan,
        oasStartAge*/

    try {
        const store = await Store.findOne({ user: req.user.id });

        store.ui_reducer.unshift(newUiReducer);
        store.user_reducer.unshift(newUserReducer);

        await store.save();

        res.json(store);
    } catch (err) {
        console.error(err.message);
        return new AppError(err.message, 500);
    }
});

//Get All Stores
exports.getAllStores = catchAsync(async ({ params: { user_id } }, res) => {
    try {
        const store = await Store.findOne({
            user: user_id
        }).populate('user', ['name']);

        if (!store) return new AppError('No Stores Available', 400);;

        return res.json(store);
    } catch (err) {
        console.error(err.message);
        return new AppError(err.message, 500);
    }
});

exports.getStore = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    });
});

exports.updateStore = catchAsync(async (req, res, next) => {

    const {
        colorIndex,
        dualSelectValue,
        newStream,
        progress,
        scenarios,
        selectedAccount,
        selectedId,
        selectedPage,
        selectedScenario,
        selectedUser,

        desiredRetirementIncome,
        hasChildrenStatus,
        inflationRate,
        maritalStatus,
        MER,
        numberOfChildren,
        province,
        rate1,
        rate2
    } = req.body;

    const newUiReducer = {
        colorIndex,
        dualSelectValue,
        newStream,
        progress,
        scenarios,
        selectedAccount,
        selectedId,
        selectedPage,
        selectedScenario,
        selectedUser,
    };

    const newUserReducer = {

        desiredRetirementIncome,
        hasChildrenStatus,
        inflationRate,
        maritalStatus,
        MER,
        numberOfChildren,
        province,
        rate1,
        rate2
    };

    try {
        const store = await Store.findOne({ user: req.user.id });

        store.ui_reducer.unshift(newUiReducer);
        store.user_reducer.unshift(newUserReducer);

        await store.save();

        res.json(store);
    } catch (err) {
        console.error(err.message);
        return new AppError(err.message, 500);
    }
});

// Delete Store
exports.deleteStore = catchAsync(async (req, res, next) => {
    try {

        const store = await Post.findById(req.params.id);
        if (!store) {
            return new AppError('Store not found', 404);
        }

        // Check user
        if (store.user.toString() !== req.user.id) {
            return new AppError('Store not found', 401);
        }

        await store.remove();

        res.json({ msg: 'Post removed' });
    } catch (err) {
        console.error(err.message);

        return new AppError(err.message, 500);
    }
});


