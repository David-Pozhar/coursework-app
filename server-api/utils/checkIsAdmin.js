// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res, next) => {
    if (req.isAdmin) {
        next();
    } else {
        return res.status(403).json({
            message: 'This operation needs admin access',
        });
    }
};
