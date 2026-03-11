import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../widgets/custom_button.dart';
import '../../widgets/otp_input.dart';

class VerificationScreen extends StatefulWidget {
  final String email;

  const VerificationScreen({super.key, required this.email});

  @override
  State<VerificationScreen> createState() => _VerificationScreenState();
}

class _VerificationScreenState extends State<VerificationScreen> {
  bool _isLoading = false;
  int _remainingSeconds = 45;
  String _otpCode = '';

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  void _startTimer() {
    Future.delayed(const Duration(seconds: 1), () {
      if (mounted && _remainingSeconds > 0) {
        setState(() => _remainingSeconds--);
        _startTimer();
      }
    });
  }

  @override
  void dispose() {
    super.dispose();
  }

  void _handleVerify(String code) {
    if (code.length == 4) {
      setState(() => _isLoading = true);
      // TODO: Implement verification with backend
      Future.delayed(const Duration(seconds: 1), () {
        setState(() => _isLoading = false);
        // Navigate to home screen on success
        Navigator.pushReplacementNamed(context, '/home');
      });
    }
  }

  void _handleResend() {
    if (_remainingSeconds == 0) {
      setState(() => _remainingSeconds = 45);
      _startTimer();
      // TODO: Resend verification code
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        decoration: const BoxDecoration(gradient: AppTheme.authGradient),
        child: SafeArea(
          child: SingleChildScrollView(
            child: Column(
              children: [
                const SizedBox(height: 40),
                // Shield verification illustration
                Image.asset(
                  'assets/illustrations/shield_verification.png',
                  height: 150,
                  fit: BoxFit.contain,
                ),
                const SizedBox(height: 60),
                // Verification form container
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(24),
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(40),
                      topRight: Radius.circular(40),
                    ),
                  ),
                  child: Column(
                    children: [
                      const Text(
                        'Verification',
                        style: TextStyle(
                          fontSize: 28,
                          fontWeight: FontWeight.bold,
                          color: AppTheme.textDark,
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        'Please, enter the verification code sent to:',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: AppTheme.textGrey,
                          fontSize: 14,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        widget.email,
                        style: const TextStyle(
                          color: AppTheme.primaryBlue,
                          fontWeight: FontWeight.w600,
                          fontSize: 14,
                        ),
                      ),
                      const SizedBox(height: 40),
                      // OTP input using custom widget
                      OtpInput(
                        length: 4,
                        onCompleted: (code) {
                          setState(() => _otpCode = code);
                          _handleVerify(code);
                        },
                        onChanged: (code) {
                          setState(() => _otpCode = code);
                        },
                      ),
                      const SizedBox(height: 100),
                      // Resend and timer
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          GestureDetector(
                            onTap: _handleResend,
                            child: Text(
                              "Didn't receive code? Resend",
                              style: TextStyle(
                                color: _remainingSeconds == 0
                                    ? AppTheme.primaryBlue
                                    : AppTheme.textGrey,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                          Text(
                            '00:${_remainingSeconds.toString().padLeft(2, '0')}',
                            style: const TextStyle(
                              color: AppTheme.textGrey,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 24),
                      // Verify button
                      CustomButton(
                        text: 'Verify',
                        onPressed: () => _handleVerify(_otpCode),
                        isLoading: _isLoading,
                      ),
                      const SizedBox(height: 40),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
