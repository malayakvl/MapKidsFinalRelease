import passport from '../middleware/passport.js';
import { getTokensAndSetCookies } from '../lib/token.js';
import userModel from '../models/User.js';
import invitationModel from '../models/Invitation.js'
import { sendMail } from '../lib/sendMail.js';
import { restoreEmail } from '../sender/templates.js';

class AuthController {
    /**
     * Login user via email and password
     * @param req
     * @param res
     * @param next
     */
    authLogin(req, res, next) {
        passport.authenticate('local', { session: false },
            (err, authUser, info) => {
                if (err) {
                    return res.status(500).json({ code: 500, message: 'Authentification failed', error: {message: "dsadasd"} });
                }
                if (!authUser) {
                    return res.status(400).json({ code: 400, message: info.message });
                }
                req.login(authUser, { session: false }, (err) => {
                    if (err) {
                        res.send(err);
                    }
                    getTokensAndSetCookies(req, res, authUser.id, authUser.email);

                    res.status(200).json({ user: authUser });
                });
            }
        )(req, res, next);
    }


    async restorePassword(req, res) {
        const data = req.body;
        const user = await userModel.findUserByEmail(data.email);
        if (!user) return res.status(402).json({ status: false, error: 'wrong email' });

        let invitation = await invitationModel.findByEmail(data.email);

        if (invitation) {
            await invitationModel.delete(invitation.id)
        }

        invitation = await invitationModel.create(user);

        const link = `${process.env.APPLICATION_BASE_URL}/auth/restore/password?hash=${invitation.hash}`;
        const mail = await restoreEmail(data.email, link, "en");

        sendMail(
            data.email,
            mail.subject,
            mail.body
        );

        res.status(200).json({ status: true });
    }


    async changePassword(req, res) {
        let { hashStr, password, password_confirmation } = req.body;
        let invitation = await invitationModel.findByHash(hashStr);
        if (!invitation) {
            return res.status(403).json({ success: false, message: "You don't have invitation" });
        }

        if (!invitation.active) {
            return res.status(403).json({ success: false, message: "Your invitation isn't active" });
        }

        const user = await userModel.findUserByEmail(invitation.email);

        if (password !== password_confirmation) {
            return res.status(200).json({success: false, message: 'Passwords do not match'});
        }

        const { success = false, error } = await userModel.changePassword(user, { password });

        if (error) {
            return res.status(error.code).json({success, message: error.message});
        }

        invitationModel.deactivate(invitation.id);

        return res.status(200).json({ success });
    }

    async activateHash(req, res) {
        const user = await userModel.activateByHash(req.params.hash);
        if (user) {
            res.status(200).json({ user: user });
        } else {
            res.status(402).json({ user: null, error: 'No user or token expired' });
        }
    }

    async getInvitation(req, res) {
        if (!req.params) {
            return res.status(404).json({})
        }

        if (!req.params.hash) {
            return res.status(404).json({})
        }

        let hash = await invitationModel.findByHash(req.params.hash)
        if (hash && hash.active) {
            return res.status(200).json(hash);
        }

        return res.status(404).json({})
    }

}

export default new AuthController();
